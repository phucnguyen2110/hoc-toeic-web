// TRIPLE PASSAGE for Part 7 (15 questions - 1 set of 3 related documents)

const part7TriplePassage = {
    id: 'p7-triple-1',
    type: 'triple',
    title: 'Company Merger Documents',
    passages: [
        {
            title: 'Press Release',
            text: `FOR IMMEDIATE RELEASE

TechVision Announces Merger with DataFlow Solutions

San Francisco, CA - August 1, 2024

TechVision Inc., a leading provider of cloud-based business software, today announced its merger with DataFlow Solutions, a data analytics company based in Boston. The combined company will operate under the TechVision name and will be headquartered in San Francisco.

The merger brings together TechVision's 800 employees with DataFlow's 350-member team, creating one of the largest enterprise software providers in North America. The transaction, valued at $250 million, is expected to close by October 15, pending regulatory approval.

"This merger positions us to offer comprehensive solutions to our clients," said Robert Chang, CEO of TechVision. "DataFlow's analytics capabilities perfectly complement our cloud infrastructure."

Current customers of both companies will continue to receive uninterrupted service. A detailed integration plan will be shared with clients by September 1.

The merger is expected to generate cost savings of $15 million annually while creating 100 new positions in product development and customer support.

Contact:
media@techvision.com
(415) 555-0199`
        },
        {
            title: 'Email to Employees',
            text: `From: robert.chang@techvision.com
To: all.employees@techvision.com; all.employees@dataflow.com
Subject: Welcome to the New TechVision
Date: August 1

Dear Team Members,

I'm excited to officially welcome our DataFlow colleagues to TechVision! Today marks the beginning of an exciting new chapter for our combined organization.

Here's what you need to know:

IMMEDIATE CHANGES:
- All current employment contracts remain in effect
- Benefits and compensation packages are unchanged
- Both San Francisco and Boston offices will remain operational

TRANSITION TIMELINE:
August-September: Integration planning and team introductions
October: Office consolidations begin (voluntary relocations only)
November: Unified branding and product launches
December: Year-end celebration for entire team

YOUR ROLE:
Next week, you'll receive an invitation to virtual meet-and-greet sessions with your new colleagues. Department heads will schedule team meetings to discuss specific workflows and projects.

We've set up a dedicated website (merger.techvision.com) with FAQs, resources, and updates. You can also submit questions anonymously.

Please join me for a company-wide virtual town hall on August 15 at 2 PM PT/5 PM ET. We'll discuss our vision and answer your questions.

Thank you for your continued dedication and flexibility during this transition.

Robert Chang
CEO, TechVision`
        },
        {
            title: 'Internal Memo - Boston Office',
            text: `MEMORANDUM

TO: All Boston Office Staff (Former DataFlow)
FROM: Jennifer Martinez, Boston Site Manager
DATE: August 5
RE: Relocation Support Program

As mentioned in Robert's email, office relocation is entirely VOLUNTARY. However, for those interested in relocating to San Francisco, TechVision is offering a comprehensive support package:

RELOCATION BENEFITS:
• Moving expenses: Up to $15,000 (fully reimbursed)
• Temporary housing: 60 days in corporate apartments
• House-hunting trips: Two round-trip flights
• Spouse/partner job search assistance
• Cost-of-living salary adjustment: +12%

BOSTON OFFICE FUTURE:
For employees staying in Boston, rest assured:
- The Boston office will remain a key technical center
- We're keeping 200+ positions here
- New hires for Boston location will begin in November
- Office renovations planned for January 2025

DECISION TIMELINE:
- August 1-31: Information sessions and site visits
- September 15: Deadline to indicate relocation interest
- October 1-30: Relocation packages processed
- November 1: Target date for moves to begin

One-on-one consultations available: Email relocation@techvision.com

I understand this creates uncertainty. Please don't hesitate to contact me with concerns.

Jennifer Martinez
Boston Site Manager
jmartinez@techvision.com
Office: (617) 555-0145`
        }
    ],
    questions: [
        {
            id: 'p7-t1-1',
            question: 'What is the value of the merger?',
            options: ['$150 million', '$200 million', '$250 million', '$300 million'],
            correctAnswer: 2,
            explanation: 'Giá trị sáp nhập là $250 triệu ("The transaction, valued at $250 million").'
        },
        {
            id: 'p7-t1-2',
            question: 'When is the merger expected to close?',
            options: ['August 1', 'September 1', 'October 15', 'November 1'],
            correctAnswer: 2,
            explanation: 'Dự kiến hoàn tất vào Oct 15 ("expected to close by October 15").'
        },
        {
            id: 'p7-t1-3',
            question: 'How many employees will the combined company have?',
            options: ['350', '800', '1,000', '1,150'],
            correctAnswer: 3,
            explanation: 'Tổng 800 + 350 = 1,150 nhân viên.'
        },
        {
            id: 'p7-t1-4',
            question: 'What will happen to current benefits?',
            options: [
                'They will be reduced',
                'They will be improved',
                'They remain unchanged',
                'They will be reviewed'
            ],
            correctAnswer: 2,
            explanation: 'Phúc lợi không thay đổi ("Benefits and compensation packages are unchanged").'
        },
        {
            id: 'p7-t1-5',
            question: 'When is the town hall meeting?',
            options: ['August 1', 'August 5', 'August 15', 'September 1'],
            correctAnswer: 2,
            explanation: 'Họp toàn công ty vào Aug 15 ("company-wide virtual town hall on August 15").'
        },
        {
            id: 'p7-t1-6',
            question: 'What is the maximum moving expense reimbursement?',
            options: ['$10,000', '$12,000', '$15,000', '$20,000'],
            correctAnswer: 2,
            explanation: 'Hoàn phí chuyển nhà tối đa $15,000 ("Moving expenses: Up to $15,000").'
        },
        {
            id: 'p7-t1-7',
            question: 'Is relocation mandatory?',
            options: [
                'Yes, for all employees',
                'Yes, for managers only',
                'No, it is voluntary',
                'Not mentioned'
            ],
            correctAnswer: 2,
            explanation: 'Chuyển đi là tự nguyện ("office relocation is entirely VOLUNTARY").'
        },
        {
            id: 'p7-t1-8',
            question: 'How many positions will remain in Boston?',
            options: ['100+', '200+', '300+', '400+'],
            correctAnswer: 1,
            explanation: 'Boston giữ hơn 200 vị trí ("We\'re keeping 200+ positions here").'
        },
        {
            id: 'p7-t1-9',
            question: 'What is the salary adjustment for relocating employees?',
            options: ['8%', '10%', '12%', '15%'],
            correctAnswer: 2,
            explanation: 'Tăng lương 12% ("Cost-of-living salary adjustment: +12%").'
        },
        {
            id: 'p7-t1-10',
            question: 'When is the deadline to indicate relocation interest?',
            options: ['August 31', 'September 15', 'October 1', 'October 15'],
            correctAnswer: 1,
            explanation: 'Hạn chót báo ý định là Sept 15 ("September 15: Deadline to indicate relocation interest").'
        },
        {
            id: 'p7-t1-11',
            question: 'How many new positions will the merger create?',
            options: ['50', '75', '100', '150'],
            correctAnswer: 2,
            explanation: 'Tạo 100 vị trí mới ("creating 100 new positions").'
        },
        {
            id: 'p7-t1-12',
            question: 'Where will the combined company be headquartered?',
            options: ['Boston', 'San Francisco', 'New York', 'Both cities'],
            correctAnswer: 1,
            explanation: 'Trụ sở tại San Francisco ("will be headquartered in San Francisco").'
        },
        {
            id: 'p7-t1-13',
            question: 'What is provided for spouse/partner?',
            options: ['Relocation bonus', 'Job search help', 'Free housing', 'Travel allowance'],
            correctAnswer: 1,
            explanation: 'Hỗ trợ tìm việc cho vợ/chồng ("Spouse/partner job search assistance").'
        },
        {
            id: 'p7-t1-14',
            question: 'When will office renovations in Boston begin?',
            options: ['September 2024', 'October 2024', 'November 2024', 'January 2025'],
            correctAnswer: 3,
            explanation: 'Cải tạo văn phòng Boston vào Jan 2025 ("Office renovations planned for January 2025").'
        },
        {
            id: 'p7-t1-15',
            question: 'How can employees submit anonymous questions?',
            options: [
                'Email the CEO',
                'Call HR hotline',
                'Visit merger website',
                'Mail to office'
            ],
            correctAnswer: 2,
            explanation: 'Gửi câu hỏi ẩn danh qua website ("You can also submit questions anonymously" trên merger.techvision.com).'
        }
    ]
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { part7TriplePassage };
}
