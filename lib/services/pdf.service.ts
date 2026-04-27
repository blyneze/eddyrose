import puppeteer from "puppeteer"
import handlebars from "handlebars"
import { FullCalculatedResult } from "./result-calculator"

/**
 * PDF Generation Service for Eddyrose Academy.
 * Renders the report card using Puppeteer and a Handlebars template.
 */

export class PDFService {
  private static templateHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 40px;
            color: #18181b;
            line-height: 1.4;
            background: #fff;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px solid #1e3a8a; /* eddyrose-deep */
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .school-info h1 {
            color: #1e3a8a;
            margin: 0;
            font-size: 28px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .school-info p {
            margin: 5px 0;
            font-size: 13px;
            color: #71717a;
            font-weight: 500;
        }

        .report-title {
            text-align: center;
            background: #ca8a04; /* eddyrose-gold */
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 30px;
        }

        .student-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }

        .meta-item {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
        }

        .meta-label {
            font-weight: 600;
            color: #64748b;
        }

        .meta-value {
            font-weight: 700;
            color: #1e293b;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        th {
            background: #1e3a8a;
            color: white;
            text-align: left;
            padding: 12px;
            font-size: 12px;
            text-transform: uppercase;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13px;
        }

        .total-row {
            background: #f1f5f9;
            font-weight: 700;
        }

        .footer-sections {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

        .comment-box {
            border: 1px solid #e2e8f0;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .comment-title {
            font-size: 12px;
            font-weight: 700;
            color: #ca8a04;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: #1e3a8a;
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
        }

        .stat-val {
            font-size: 20px;
            font-weight: 800;
        }

        .stat-label {
            font-size: 10px;
            opacity: 0.8;
            text-transform: uppercase;
        }

        .signature-row {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }

        .sig-line {
            border-top: 2px solid #e2e8f0;
            width: 200px;
            text-align: center;
            padding-top: 10px;
            font-size: 12px;
            font-weight: 600;
        }

        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 11px;
        }

        .pass { background: #dcfce7; color: #166534; }
        .fail { background: #fee2e2; color: #991b1b; }
    </style>
</head>
<body>
    <div class="header">
        <div class="school-info">
            <h1>EDDYROSE INT'L ACADEMY</h1>
            <p>No. 3 IBB Avenue, Uyo, Akwa Ibom State, Nigeria</p>
            <p>Contact: +234 704 576 2841 | eddyroseintlacademy@gmail.com</p>
        </div>
    </div>

    <div class="report-title">
        ACADEMIC REPORT CARD — {{term}} {{session}}
    </div>

    <div class="student-meta">
        <div class="meta-item"><span class="meta-label">Student Name:</span> <span class="meta-value">{{studentName}}</span></div>
        <div class="meta-item"><span class="meta-label">Reg. Number:</span> <span class="meta-value">{{registrationNumber}}</span></div>
        <div class="meta-item"><span class="meta-label">Class:</span> <span class="meta-value">{{className}}</span></div>
        <div class="meta-item"><span class="meta-label">Class Size:</span> <span class="meta-value">{{classSize}}</span></div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Subject</th>
                <th>Test (30)</th>
                <th>Exam (70)</th>
                <th>Total (100)</th>
                <th>Grade</th>
                <th>Class Avg</th>
                <th>Highest</th>
                <th>Lowest</th>
            </tr>
        </thead>
        <tbody>
            {{#each entries}}
            <tr>
                <td style="font-weight:600">{{subjectName}}</td>
                <td>{{testScore}}</td>
                <td>{{examScore}}</td>
                <td style="font-weight:700">{{totalScore}}</td>
                <td>{{grade}}</td>
                <td>{{classAverage}}</td>
                <td>{{highestInClass}}</td>
                <td>{{lowestInClass}}</td>
            </tr>
            {{/each}}
            <tr class="total-row">
                <td colspan="3">SUMMARY</td>
                <td>{{totalScore}}</td>
                <td colspan="4">AVERAGE: {{average}}%</td>
            </tr>
        </tbody>
    </table>

    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-val">{{position}}</div>
            <div class="stat-label">Position in Class</div>
        </div>
        <div class="stat-card">
            <div class="stat-val">{{average}}%</div>
            <div class="stat-label">Final Average</div>
        </div>
        <div class="stat-card" style="background: {{#if (eq passStatus 'PASS')}}#059669{{else}}#dc2626{{/if}}">
            <div class="stat-val">{{passStatus}}</div>
            <div class="stat-label">Result Status</div>
        </div>
    </div>

    <div class="footer-sections">
        <div>
            <div class="comment-box">
                <div class="comment-title">Class Teacher's Remark</div>
                <div style="font-size: 13px">{{teacherComment}}</div>
            </div>
            <div class="comment-box">
                <div class="comment-title">Head of School's Remark</div>
                <div style="font-size: 13px">{{principalComment}}</div>
            </div>
        </div>
        <div>
            <div class="comment-box" style="background: #fffbeb; border-color: #fef3c7;">
                <div class="comment-title">School Calendar</div>
                <div style="font-size: 13px; margin-bottom: 5px;">
                    <span style="font-weight:600">Closing Date:</span> {{closingDate}}
                </div>
                <div style="font-size: 13px">
                    <span style="font-weight:600">Resumption:</span> {{resumptionDate}}
                </div>
            </div>
        </div>
    </div>

    <div class="signature-row">
        <div class="sig-line">Class Teacher</div>
        <div class="sig-line">Academic Manager</div>
        <div class="sig-line">School Stamp / Date</div>
    </div>
</body>
</html>
  `

  static async generatePDF(data: FullCalculatedResult): Promise<Buffer> {
    const template = handlebars.compile(this.templateHtml)
    
    // Format dates for display
    const viewData = {
      ...data,
      average: data.average.toFixed(2),
      classAverage: data.classAverage.toFixed(2),
      closingDate: data.closingDate ? new Date(data.closingDate).toLocaleDateString() : "TBA",
      resumptionDate: data.resumptionDate ? new Date(data.resumptionDate).toLocaleDateString() : "TBA",
      entries: data.entries.map(e => ({
        ...e,
        classAverage: e.classAverage.toFixed(1)
      }))
    }

    const html = template(viewData)

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })
    
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    })

    await browser.close()
    return Buffer.from(pdf)
  }
}

// Register helper for pass/fail comparison
handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});
