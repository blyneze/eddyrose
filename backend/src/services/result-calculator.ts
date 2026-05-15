import prisma from '../lib/prisma'

export type CalculatedSubjectEntry = {
  subjectName: string
  testScore: number
  examScore: number
  totalScore: number
  grade: string
  remark: string
  classAverage: number
  highestInClass: number
  lowestInClass: number
}

export type FullCalculatedResult = {
  studentName: string
  registrationNumber: string
  className: string
  classSize: number
  session: string
  term: string
  entries: CalculatedSubjectEntry[]
  totalScore: number
  average: number
  classAverage: number
  position: string
  status: string
  passStatus: 'PASS' | 'FAIL'
  overallRating: number
  affectiveDomain: Record<string, number>
  teacherComment: string
  principalComment: string
  closingDate?: Date
  resumptionDate?: Date
}

export class ResultCalculator {
  static getGrade(score: number): { grade: string; remark: string } {
    if (score >= 70) return { grade: 'A', remark: 'Excellent' }
    if (score >= 60) return { grade: 'B', remark: 'Very Good' }
    if (score >= 50) return { grade: 'C', remark: 'Good' }
    if (score >= 45) return { grade: 'D', remark: 'Pass' }
    if (score >= 40) return { grade: 'E', remark: 'Fair' }
    return { grade: 'F', remark: 'Fail' }
  }

  static formatPosition(pos: number): string {
    const s = ['th', 'st', 'nd', 'rd']
    const v = pos % 100
    return pos + (s[(v - 20) % 10] || s[v] || s[0])
  }

  static async calculate(resultSheetId: string): Promise<FullCalculatedResult> {
    const sheet = await prisma.resultSheet.findUnique({
      where: { id: resultSheetId },
      include: {
        student: true,
        class: { include: { subjects: { include: { subject: true } } } },
        session: true,
        term: true,
        entries: { include: { classSubject: { include: { subject: true } } } },
      },
    })
    if (!sheet) throw new Error('Result sheet not found')

    const classSheets = await prisma.resultSheet.findMany({
      where: { classId: sheet.classId, sessionId: sheet.sessionId, termId: sheet.termId },
      include: { entries: true },
    })
    const classSize = classSheets.length

    const subjectStats: Record<string, number[]> = {}
    const studentTotalScores: Record<string, number> = {}

    classSheets.forEach((s: any) => {
      let studentTotal = 0
      s.entries.forEach((e: any) => {
        const total = (e.testScore || 0) + (e.examScore || 0)
        studentTotal += total
        const subId = e.classSubjectId
        if (!subjectStats[subId]) subjectStats[subId] = []
        subjectStats[subId].push(total)
      })
      studentTotalScores[s.id] = studentTotal
    })

    const sortedTotals = Object.values(studentTotalScores).sort((a, b) => b - a)
    const currentTotal = studentTotalScores[sheet.id] || 0
    const positionIndex = sortedTotals.indexOf(currentTotal) + 1
    const position = this.formatPosition(positionIndex)

    const calculatedEntries: CalculatedSubjectEntry[] = sheet.entries.map((e: any) => {
      const total = (e.testScore || 0) + (e.examScore || 0)
      const { grade, remark } = this.getGrade(total)
      const stats = subjectStats[e.classSubjectId] || [total]
      return {
        subjectName: e.classSubject.subject.name,
        testScore: e.testScore || 0,
        examScore: e.examScore || 0,
        totalScore: total,
        grade,
        remark,
        classAverage: stats.reduce((a, b) => a + b, 0) / stats.length,
        highestInClass: Math.max(...stats),
        lowestInClass: Math.min(...stats),
      }
    })

    const studentTotal = calculatedEntries.reduce((a, b) => a + b.totalScore, 0)
    const studentAverage = calculatedEntries.length > 0 ? studentTotal / calculatedEntries.length : 0
    const allStudentAverages = Object.values(studentTotalScores).map(
      (t) => t / (calculatedEntries.length || 1)
    )
    const classOverallAverage =
      allStudentAverages.reduce((a, b) => a + b, 0) / (allStudentAverages.length || 1)

    return {
      studentName: sheet.student.name,
      registrationNumber: sheet.student.registrationNumber,
      className: sheet.class.name,
      classSize,
      session: sheet.session.name,
      term: sheet.term.name,
      entries: calculatedEntries,
      totalScore: studentTotal,
      average: studentAverage,
      classAverage: classOverallAverage,
      position,
      status: sheet.status,
      passStatus: studentAverage >= 40 ? 'PASS' : 'FAIL',
      overallRating: studentAverage / 20,
      affectiveDomain: (sheet.affectiveDomain as Record<string, number>) || {},
      teacherComment: sheet.teacherComment || 'No comment provided.',
      principalComment: sheet.principalComment || 'No comment provided.',
      closingDate: sheet.closingDate || undefined,
      resumptionDate: sheet.resumptionDate || undefined,
    }
  }
}
