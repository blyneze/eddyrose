import puppeteer from 'puppeteer'
import handlebars from 'handlebars'
import { FullCalculatedResult } from './result-calculator'

handlebars.registerHelper('eq', function (a: unknown, b: unknown) {
  return a === b
})

handlebars.registerHelper('stars', function (rating: number) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  let starsHtml = ''
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<span style="color:#3b82f6; font-size:18px; margin-right:2px;">★</span>'
    } else if (i === fullStars && hasHalf) {
      starsHtml += '<span style="color:#3b82f6; font-size:18px; margin-right:2px; position:relative; display:inline-block; overflow:hidden; width:9px; vertical-align:middle;">★</span>'
    } else {
      starsHtml += '<span style="color:#cbd5e1; font-size:18px; margin-right:2px;">★</span>'
    }
  }
  return new handlebars.SafeString(starsHtml)
})

const AFFECTIVE_TRAITS = [
  { key: "verbalFluency", label: "Verbal Fluency" },
  { key: "handWriting", label: "Free Hand Movement/Hand Writing" },
  { key: "sports", label: "Singing/Games/Sports" },
  { key: "drawing", label: "Drawing & Painting" },
  { key: "toyHandling", label: "Handling Of Toy And Tools" },
  { key: "punctuality", label: "Punctuality" },
  { key: "neatness", label: "Neatness" },
  { key: "stability", label: "Emotional Stability" },
  { key: "politeness", label: "Politeness" },
  { key: "health", label: "Health" },
  { key: "interaction", label: "Interaction" },
  { key: "attentiveness", label: "Attentiveness" },
]

const templateHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        body { 
            font-family: 'Outfit', sans-serif; 
            margin: 0; 
            padding: 30px; 
            color: #1e293b; 
            line-height: 1.4; 
            background: #fff; 
        }
        
        .header { 
            text-align: center;
            border-bottom: 2px solid #3b82f6; 
            padding-bottom: 12px; 
            margin-bottom: 20px; 
        }
        .header h1 { 
            color: #1e3a8a; 
            margin: 0; 
            font-size: 26px; 
            font-weight: 800; 
            text-transform: uppercase; 
            letter-spacing: 0.5px;
        }
        .header p { 
            margin: 3px 0; 
            font-size: 12px; 
            color: #475569; 
            font-weight: 500; 
        }
        .header .subtitle {
            font-size: 16px;
            font-weight: 700;
            color: #1e3a8a;
            margin-top: 8px;
        }
        .header .term-title {
            color: #db2777;
            font-size: 15px;
            font-weight: 700;
            margin-top: 4px;
        }

        /* Meta Table */
        .student-meta { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 1px; 
            background: #3b82f6; 
            border: 2px solid #3b82f6;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 20px; 
            font-size: 12px;
        }
        .meta-cell {
            background: #fff;
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .meta-label { 
            font-weight: 600; 
            color: #2563eb; 
        }
        .meta-value { 
            font-weight: 700; 
            color: #0f172a; 
        }

        /* Two-column layout */
        .main-layout {
            display: grid;
            grid-template-columns: 2.1fr 0.9fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        /* Cognitive Domain Table */
        .cognitive-box {
            border: 2px solid #3b82f6;
            border-radius: 8px;
            overflow: hidden;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
        }
        th { 
            background: #2563eb; 
            color: white; 
            text-align: left; 
            padding: 8px 10px; 
            font-size: 10px; 
            text-transform: uppercase; 
            font-weight: 700;
            border-bottom: 2px solid #3b82f6;
        }
        td { 
            padding: 8px 10px; 
            border-bottom: 1px solid #e2e8f0; 
            font-size: 12px; 
        }
        .subject-cell {
            font-weight: 600;
            color: #1e293b;
        }
        .score-val {
            font-weight: 600;
            color: #1e3a8a;
        }
        .score-total {
            font-weight: 700;
            color: #10b981;
        }
        .grade-cell {
            font-weight: 800;
            color: #2563eb;
        }
        .remark-cell {
            font-weight: 600;
            color: #059669;
        }

        /* Right Panel */
        .right-panel {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .panel-card {
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 12px;
            background: #fff;
        }
        .card-title {
            font-size: 11px;
            font-weight: 700;
            color: #2563eb;
            text-transform: uppercase;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 6px;
            margin-bottom: 8px;
            text-align: center;
        }

        /* Total Score */
        .total-score-card {
            background: #f0fdf4;
            border-color: #10b981;
            text-align: center;
        }
        .total-score-val {
            font-size: 20px;
            font-weight: 800;
            color: #047857;
        }

        /* Grade Keys */
        .grade-keys-list {
            font-size: 10px;
            color: #475569;
            line-height: 1.5;
        }

        /* Affective Domain */
        .affective-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            padding: 3px 0;
            border-bottom: 1px dashed #f1f5f9;
        }
        .affective-label {
            font-weight: 500;
            color: #334155;
        }
        .affective-check {
            font-weight: 800;
            color: #059669;
        }

        /* Rating Stars */
        .rating-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;
        }
        .rating-val {
            font-size: 16px;
            font-weight: 800;
            color: #1e3a8a;
        }
        
        .badge-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 5px;
            font-size: 12px;
            font-weight: 700;
        }
        .status-badge {
            background: #d1fae5;
            color: #065f46;
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 11px;
        }
        .status-badge.fail {
            background: #fee2e2;
            color: #991b1b;
        }

        /* Remarks Box */
        .comment-section {
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
        .comment-label {
            font-size: 11px;
            font-weight: 700;
            color: #2563eb;
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .comment-text {
            font-size: 13px;
            font-weight: 500;
            color: #334155;
            min-height: 40px;
        }

        /* Bottom Row */
        .bottom-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 20px;
            align-items: center;
            font-size: 12px;
        }
        .signee-col {
            text-align: center;
        }
        .sig-line {
            border-top: 1.5px solid #94a3b8;
            margin-top: 40px;
            padding-top: 6px;
            font-weight: 600;
            color: #475569;
        }
        .date-box {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 8px 12px;
        }
        .date-item {
            margin: 4px 0;
            font-weight: 500;
        }
        .date-item span {
            font-weight: 700;
            color: #1e3a8a;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>EDDYROSE INTERNATIONAL ACADEMY</h1>
        <p>3, IBB Avenue, Uyo, Akwa Ibom, Nigeria</p>
        <p>234-7045762841 | eddyroseintlacademy@gmail.com</p>
        <div class="subtitle">Nursery School</div>
        <div class="term-title">{{session}} {{term}} Final Report</div>
    </div>

    <div class="student-meta">
        <div class="meta-cell"><span class="meta-label">Id</span><span class="meta-value">{{registrationNumber}}</span></div>
        <div class="meta-cell"><span class="meta-label">Class Name</span><span class="meta-value">{{className}}</span></div>
        <div class="meta-cell"><span class="meta-label">Session / Term</span><span class="meta-value">{{session}} / {{term}}</span></div>
        
        <div class="meta-cell"><span class="meta-label">Full Name</span><span class="meta-value">{{studentName}}</span></div>
        <div class="meta-cell"><span class="meta-label">Class Size</span><span class="meta-value">{{classSize}}</span></div>
        <div class="meta-cell"><span class="meta-label">Class Average</span><span class="meta-value">{{classAverage}}</span></div>
        
        <div class="meta-cell"><span class="meta-label">Sex</span><span class="meta-value">Female</span></div>
        <div class="meta-cell"><span class="meta-label">Student Position</span><span class="meta-value">{{position}}</span></div>
        <div class="meta-cell"><span class="meta-label">Student Average</span><span class="meta-value">{{average}}</span></div>
    </div>

    <div class="main-layout">
        <div class="cognitive-box">
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th style="text-align: center;">TEST (30)</th>
                        <th style="text-align: center;">EXAMS (70)</th>
                        <th style="text-align: center;">TOTAL (100)</th>
                        <th style="text-align: center;">Class Avg</th>
                        <th style="text-align: center;">Highest</th>
                        <th style="text-align: center;">Lowest</th>
                        <th style="text-align: center;">Grade</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each entries}}
                    <tr>
                        <td class="subject-cell">{{subjectName}}</td>
                        <td style="text-align: center;" class="score-val">{{testScore}}</td>
                        <td style="text-align: center;" class="score-val">{{examScore}}</td>
                        <td style="text-align: center;" class="score-total">{{totalScore}}</td>
                        <td style="text-align: center;">{{classAverage}}</td>
                        <td style="text-align: center; color: #047857;">{{highestInClass}}</td>
                        <td style="text-align: center; color: #b91c1c;">{{lowestInClass}}</td>
                        <td style="text-align: center;" class="grade-cell">{{grade}}</td>
                        <td class="remark-cell">{{remark}}</td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </div>

        <div class="right-panel">
            <div class="panel-card total-score-card">
                <div class="card-title" style="color: #047857; border-bottom-color: #a7f3d0;">Total Score</div>
                <div class="total-score-val">{{totalScore}} <span style="font-size: 12px; color: #6b7280; font-weight: 500;">/ {{maxTotalScore}}</span></div>
            </div>

            <div class="panel-card">
                <div class="card-title">Cognitive Grade Keys</div>
                <div class="grade-keys-list">
                    <span style="color:#047857; font-weight:700;">Distinction 70-100 A</span><br/>
                    Very Good 60-69.9 B<br/>
                    Good 50-59.9 C<br/>
                    Pass 45-49.9 D<br/>
                    Fair 40-44.9 E<br/>
                    <span style="color:#b91c1c; font-weight:700;">Fail 0-39.9 F</span>
                </div>
            </div>

            <div class="panel-card">
                <div class="card-title">Affective Domain</div>
                <div class="affective-list">
                    {{#each affectiveList}}
                    <div class="affective-item">
                        <span class="affective-label">{{label}}</span>
                        <span class="affective-check">{{#if checked}}✔{{else}}—{{/if}}</span>
                    </div>
                    {{/each}}
                </div>
            </div>

            <div class="panel-card">
                <div class="card-title">Overall Performance</div>
                <div class="rating-box">
                    <span class="rating-val">{{average}}</span>
                    <span>{{stars overallRating}}</span>
                </div>
                <div class="badge-box">
                    <span>Badge: <span style="color: #ca8a04;">General</span></span>
                    <span class="status-badge {{#if (eq passStatus 'FAIL')}}fail{{/if}}">{{passStatus}}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="comment-section">
        <div class="comment-label">Academic Manager Comment</div>
        <div class="comment-text">“{{teacherComment}}”</div>
    </div>

    <div class="bottom-grid">
        <div class="date-box">
            <div class="date-item">Closing Date: <span>{{closingDate}}</span></div>
            <div class="date-item">Resumption Date: <span>{{resumptionDate}}</span></div>
        </div>
        <div class="signee-col">
            <div class="sig-line">Class Teacher</div>
        </div>
        <div class="signee-col">
            <div class="sig-line">Academic Manager / Stamp</div>
        </div>
    </div>
</body>
</html>
`

export class PDFService {
  static async generatePDF(data: FullCalculatedResult): Promise<Buffer> {
    const template = handlebars.compile(templateHtml)
    
    const affectiveList = AFFECTIVE_TRAITS.map(t => ({
      label: t.label,
      checked: !!data.affectiveDomain[t.key]
    }))

    const maxTotalScore = data.entries.length * 100

    const viewData = {
      ...data,
      average: data.average.toFixed(1),
      classAverage: data.classAverage.toFixed(1),
      closingDate: data.closingDate ? new Date(data.closingDate).toISOString().split('T')[0] : 'TBA',
      resumptionDate: data.resumptionDate ? new Date(data.resumptionDate).toISOString().split('T')[0] : 'TBA',
      entries: data.entries.map((e) => ({ 
        ...e, 
        classAverage: e.classAverage.toFixed(1),
        highestInClass: e.highestInClass.toFixed(0),
        lowestInClass: e.lowestInClass.toFixed(0)
      })),
      affectiveList,
      maxTotalScore
    }
    const html = template(viewData)

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'load' })
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '15px', right: '15px', bottom: '15px', left: '15px' },
    })
    await browser.close()
    return Buffer.from(pdf)
  }
}
