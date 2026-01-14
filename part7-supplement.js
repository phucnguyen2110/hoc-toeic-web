// Part 7 Additional Passages - Add these to test-data.js after p7-single-4
// SINGLE PASSAGES (Continue to reach 29 total questions)

const part7Additional = [
    // SINGLE PASSAGE 5
    {
        id: 'p7-single-5',
        type: 'single',
        title: 'Text Message Chain',
        text: `[Text Message Chain]

Linda Chen (2:15 PM): Hi Marcus. I'm reviewing the Q2 sales report you sent. Great work on the Northeast region!

Marcus Taylor (2:18 PM): Thanks! The new product line really resonated with customers there.

Linda Chen (2:20 PM): I noticed the West Coast numbers are lower than projected. Any insights?

Marcus Taylor (2:23 PM): Yes, we faced unexpected competition from a local brand. I've scheduled meetings with our distribution partners next week to discuss strategies.

Linda Chen (2:25 PM): Good initiative. Can you have a preliminary action plan by Friday's meeting?

Marcus Taylor (2:27 PM): Absolutely. I'll send it by Thursday EOD.`,
        questions: [
            {
                id: 'p7-s5-1',
                question: 'What did Linda compliment Marcus on?',
                options: ['His action plan', 'Northeast region sales', 'Distribution strategy', 'Meeting schedule'],
                correctAnswer: 1,
                explanation: 'Linda khen về khu vực Northeast ("Great work on the Northeast region").'
            },
            {
                id: 'p7-s5-2',
                question: 'What is Marcus planning to do next week?',
                options: ['Create a sales report', 'Meet with partners', 'Visit West Coast', 'Launch new products'],
                correctAnswer: 1,
                explanation: 'Marcus sẽ gặp đối tác phân phối ("scheduled meetings with our distribution partners").'
            },
            {
                id: 'p7-s5-3',
                question: 'When will Marcus send his action plan?',
                options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                correctAnswer: 2,
                explanation: 'Marcus sẽ gửi vào thứ Năm ("I\'ll send it by Thursday EOD").'
            }
        ]
    },
    // SINGLE PASSAGE 6
    {
        id: 'p7-single-6',
        type: 'single',
        title: 'Product Review',
        text: `Customer Review: EcoClean Vacuum Cleaner
Rating: ★★★★★ (5/5)
Reviewed by: Sarah Thompson
Purchase Date: March 10

I've been using the EcoClean vacuum for two months now, and I'm thoroughly impressed. As someone with two dogs and hardwood floors, I needed something powerful yet gentle.

Pros:
- Exceptional suction power that picks up pet hair effortlessly
- Surprisingly quiet operation (much quieter than my old vacuum)
- Lightweight design makes it easy to carry upstairs
- Long battery life (up to 60 minutes on one charge)
- Easy to empty and clean

Cons:
- Slightly expensive compared to other brands
- Charging cable could be longer

Overall, this is the best vacuum I've owned. The extra cost is worth it for the quality and performance. Highly recommended for pet owners!

Would I buy again? Definitely yes!`,
        questions: [
            {
                id: 'p7-s6-1',
                question: 'What type of floors does the reviewer have?',
                options: ['Carpet', 'Tile', 'Hardwood', 'Concrete'],
                correctAnswer: 2,
                explanation: 'Người review có sàn gỗ cứng ("I needed something powerful yet gentle" + "hardwood floors").'
            },
            {
                id: 'p7-s6-2',
                question: 'What is mentioned as a disadvantage?',
                options: ['Short battery life', 'Too heavy', 'High price', 'Poor suction'],
                correctAnswer: 2,
                explanation: 'Nhược điểm là giá hơi đắt ("Slightly expensive compared to other brands").'
            },
            {
                id: 'p7-s6-3',
                question: 'Who would the reviewer recommend this product to?',
                options: ['Office workers', 'Pet owners', 'Students', 'Elderly people'],
                correctAnswer: 1,
                explanation: 'Khuyến nghị cho người nuôi thú cưng ("Highly recommended for pet owners").'
            },
            {
                id: 'p7-s6-4',
                question: 'How long has the reviewer used the product?',
                options: ['One month', 'Two months', 'Three months', 'Six months'],
                correctAnswer: 1,
                explanation: 'Đã dùng 2 tháng ("I\'ve been using the EcoClean vacuum for two months").'
            }
        ]
    },
    // SINGLE PASSAGE 7
    {
        id: 'p7-single-7',
        type: 'single',
        title: 'Invoice',
        text: `INVOICE

Green Valley Landscaping Services
123 Garden Lane, Portland, OR 97201
Phone: (555) 234-5678 | Email: info@greenvalley.com

BILL TO:
Johnson Residence
456 Oak Street
Portland, OR 97202

Invoice #: GV-2024-0856
Date: June 15, 2024
Due Date: July 15, 2024

SERVICES RENDERED:

Lawn Maintenance (June 1-30)           $180.00
Tree Trimming (2 trees)                $250.00
Flower Bed Installation               $420.00
Mulch Application (3 cubic yards)     $150.00
                                    ___________
Subtotal:                             $1,000.00
Tax (8%):                              $80.00
                                    ___________
TOTAL DUE:                            $1,080.00

Payment Terms: Net 30 days
Accepted Payment Methods: Check, Credit Card, Bank Transfer

Thank you for choosing Green Valley Landscaping!
Please remit payment to the address above or pay online at www.greenvalley.com/pay`,
        questions: [
            {
                id: 'p7-s7-1',
                question: 'What is the invoice for?',
                options: ['House cleaning', 'Landscaping services', 'Home repair', 'Pest control'],
                correctAnswer: 1,
                explanation: 'Hóa đơn cho dịch vụ chăm sóc cảnh quan ("Green Valley Landscaping Services").'
            },
            {
                id: 'p7-s7-2',
                question: 'What is the most expensive service?',
                options: ['Lawn Maintenance', 'Tree Trimming', 'Flower Bed Installation', 'Mulch Application'],
                correctAnswer: 2,
                explanation: 'Dịch vụ đắt nhất là lắp đặt luống hoa $420 ("Flower Bed Installation $420.00").'
            },
            {
                id: 'p7-s7-3',
                question: 'When is payment due?',
                options: ['June 15', 'June 30', 'July 15', 'July 30'],
                correctAnswer: 2,
                explanation: 'Hạn thanh toán là July 15 ("Due Date: July 15, 2024").'
            }
        ]
    },
    // SINGLE PASSAGE 8
    {
        id: 'p7-single-8',
        type: 'single',
        title: 'Policy Notice',
        text: `PARKING POLICY UPDATE
Effective September 1, 2024

Dear Tenants,

Due to increasing demand for parking spaces, building management is implementing a new parking policy for all residents of Riverside Apartments.

Key Changes:

1. Reserved Parking: Each apartment will be assigned ONE reserved parking space. Additional spaces may be rented for $75/month (subject to availability).

2. Visitor Parking: Visitors must display a temporary parking pass, available free at the front desk (maximum 48 hours).

3. Overnight Parking: Vehicles parked overnight in visitor spots without a valid pass will be towed at owner's expense.

4. Parking Permits: All resident vehicles must display a parking permit, which will be issued by September 15. Old permits will become invalid on October 1.

To obtain your new parking permit, please visit the management office with:
- Proof of residency (lease agreement)
- Vehicle registration
- Driver's license

Office hours: Monday-Friday, 9 AM - 5 PM

Questions? Contact us at parking@riversideapts.com

Thank you for your cooperation.

Riverside Management Team`,
        questions: [
            {
                id: 'p7-s8-1',
                question: 'How many reserved spaces does each apartment get?',
                options: ['None', 'One', 'Two', 'Three'],
                correctAnswer: 1,
                explanation: 'Mỗi căn hộ được 1 chỗ đỗ xe riêng ("Each apartment will be assigned ONE reserved parking space").'
            },
            {
                id: 'p7-s8-2',
                question: 'What do visitors need to display?',
                options: ['Registration', 'License', 'Parking pass', 'Lease agreement'],
                correctAnswer: 2,
                explanation: 'Khách cần treo thẻ đỗ xe tạm thời ("Visitors must display a temporary parking pass").'
            },
            {
                id: 'p7-s8-3',
                question: 'When do old permits become invalid?',
                options: ['September 1', 'September 15', 'October 1', 'October 15'],
                correctAnswer: 2,
                explanation: 'Thẻ cũ hết hiệu lực từ Oct 1 ("Old permits will become invalid on October 1").'
            }
        ]
    },
    // SINGLE PASSAGE 9 - Last single passage (total 29 questions)
    {
        id: 'p7-single-9',
        type: 'single',
        title: 'Workshop Announcement',
        text: `FREE PROFESSIONAL DEVELOPMENT WORKSHOP

"Effective Communication in the Digital Age"

Presenter: Dr. Amanda Foster
Author of "Connect & Communicate" and leadership consultant

Date: Saturday, September 20
Time: 9:00 AM - 12:00 PM
Location: City Library Conference Room (2nd Floor)

Workshop Topics:
• Virtual meeting etiquette
• Email communication best practices
• Managing remote teams
• Cross-cultural communication in global environments

This interactive workshop includes:
- Live demonstrations
- Group activities
- Q&A session with Dr. Foster
- Networking lunch (12:00-1:00 PM)
- Certificate of attendance

Registration:
Space is limited to 40 participants. Register by September 15 at www.citylibrary.org/workshops or call (555) 789-0123.

Early bird rate: $25 (until Sept 10)
Regular rate: $35 (Sept 11-15)

Materials Required: Bring a laptop or tablet for interactive exercises.

Cancellation Policy: Full refund if cancelled 48 hours before the event.`,
        questions: [
            {
                id: 'p7-s9-1',
                question: 'Who is the workshop presenter?',
                options: ['A librarian', 'A teacher', 'A consultant', 'A student'],
                correctAnswer: 2,
                explanation: 'Dr. Foster là nhà tư vấn lãnh đạo ("leadership consultant").'
            },
            {
                id: 'p7-s9-2',
                question: 'What is the early bird registration fee?',
                options: ['$20', '$25', '$30', '$35'],
                correctAnswer: 1,
                explanation: 'Phí đăng ký sớm là $25 ("Early bird rate: $25").'
            },
            {
                id: 'p7-s9-3',
                question: 'What should participants bring?',
                options: ['A notebook', 'A laptop or tablet', 'Textbooks', 'Business cards'],
                correctAnswer: 1,
                explanation: 'Cần mang laptop hoặc tablet ("Bring a laptop or tablet for interactive exercises").'
            }
        ]
    }
];

// DOUBLE PASSAGES (10 questions total - 2 sets)
const part7DoublePassages = [
    {
        id: 'p7-double-1',
        type: 'double',
        title: 'Email Exchange',
        passages: [
            {
                title: 'Email 1',
                text: `From: mark.stevens@techsolutions.com
To: lisa.garcia@innovatecorp.com
Subject: Software Integration Proposal
Date: August 5

Dear Ms. Garcia,

Thank you for meeting with me last week to discuss your company's software needs. As promised, I'm sending our proposal for integrating our CloudSync platform with your existing systems.

Our analysis shows that CloudSync can reduce your data processing time by 40% and improve collaboration across departments. The implementation would take approximately 8 weeks and includes:

- System assessment and customization
- Staff training (2 full-day sessions)
- 24/7 technical support for the first year
- Quarterly system updates

Total investment: $45,000

I've attached a detailed breakdown and timeline. Please review and let me know if you have any questions. I'm available for a follow-up call this week.

Best regards,
Mark Stevens
Senior Account Manager, TechSolutions`
            },
            {
                title: 'Email 2',
                text: `From: lisa.garcia@innovatecorp.com
To: mark.stevens@techsolutions.com
Subject: RE: Software Integration Proposal
Date: August 7

Dear Mr. Stevens,

Thank you for the comprehensive proposal. Our management team reviewed it yesterday, and we're very interested in moving forward.

However, we have a few questions:

1. Can the implementation be completed in 6 weeks instead of 8? We have a major product launch in October and need the system operational by then.

2. Is it possible to add a third training session? We have three shifts, and it would be easier to train each group separately.

3. What are the ongoing costs after the first year?

If we can address these points, we'd like to schedule a meeting with our IT director to finalize details.

Looking forward to your response.

Best regards,
Lisa Garcia
Operations Director, InnovateCorp`
            }
        ],
        questions: [
            {
                id: 'p7-d1-1',
                question: 'What is CloudSync?',
                options: ['A training program', 'A software platform', 'A consulting service', 'A data center'],
                correctAnswer: 1,
                explanation: 'CloudSync là nền tảng phần mềm ("CloudSync platform").'
            },
            {
                id: 'p7-d1-2',
                question: 'How long does standard implementation take?',
                options: ['6 weeks', '8 weeks', '10 weeks', '12 weeks'],
                correctAnswer: 1,
                explanation: 'Triển khai tiêu chuẩn mất 8 tuần ("implementation would take approximately 8 weeks").'
            },
            {
                id: 'p7-d1-3',
                question: 'Why does Lisa want faster implementation?',
                options: ['Budget deadline', 'Staff availability', 'Product launch', 'System upgrade'],
                correctAnswer: 2,
                explanation: 'Vì có ra mắt sản phẩm vào tháng 10 ("We have a major product launch in October").'
            },
            {
                id: 'p7-d1-4',
                question: 'How many training sessions are currently included?',
                options: ['One', 'Two', 'Three', 'Four'],
                correctAnswer: 1,
                explanation: 'Hiện có 2 buổi đào tạo ("Staff training (2 full-day sessions)").'
            },
            {
                id: 'p7-d1-5',
                question: 'What information is Lisa requesting?',
                options: ['Training materials', 'System features', 'Future costs', 'Client references'],
                correctAnswer: 2,
                explanation: 'Lisa hỏi về chi phí sau năm đầu ("What are the ongoing costs after the first year?").'
            }
        ]
    },
    // DOUBLE PASSAGE 2
    {
        id: 'p7-double-2',
        type: 'double',
        title: 'Article and Advertisement',
        passages: [
            {
                title: 'News Article',
                text: `Local Business Wins National Award

Portland, OR - Green Earth Organics, a family-owned grocery store specializing in organic produce, has been named "Small Business of the Year" by the National Retail Association.

The award recognizes businesses that demonstrate exceptional customer service, community involvement, and sustainable practices.

Founded in 2015 by siblings Maria and Carlos Mendez, Green Earth started as a small farmers' market stand. Today, the store employs 25 people and serves over 500 customers daily.

"We're honored by this recognition," said Maria Mendez, co-owner. "Our success is built on relationships with local farmers and our commitment to quality."

The store sources 80% of its products from farms within 100 miles and has eliminated plastic bags, saving an estimated 50,000 bags annually.

Green Earth will be featured in next month's National Retail Magazine and will receive a $10,000 grant to support business expansion.`
            },
            {
                title: 'Store Advertisement',
                text: `CELEBRATE WITH US!

Green Earth Organics
GRAND EXPANSION - NOW OPEN!

We've doubled our space to serve you better!

NEW FEATURES:
✓ Expanded produce section
✓ Artisan bread bakery
✓ Organic café with seating for 30
✓ Cooking demonstration kitchen
✓ Free nutrition consultations (Saturdays)

GRAND OPENING SPECIALS (Sept 15-30):
• 25% off all organic produce
• Free reusable shopping bag with $50 purchase
• Cooking demos every Saturday at 2 PM

Join us Saturday, September 15 at 10 AM for the ribbon-cutting ceremony!

Meet the farmers, enjoy free samples, and enter to win a $500 store credit!

Green Earth Organics
1234 Oak Street, Portland
Open Daily: 8 AM - 8 PM
www.greenearthorganics.com`
            }
        ],
        questions: [
            {
                id: 'p7-d2-1',
                question: 'When was Green Earth Organics founded?',
                options: ['2010', '2015', '2020', '2024'],
                correctAnswer: 1,
                explanation: 'Được thành lập năm 2015 ("Founded in 2015").'
            },
            {
                id: 'p7-d2-2',
                question: 'What percentage of products are local?',
                options: ['50%', '60%', '70%', '80%'],
                correctAnswer: 3,
                explanation: '80% sản phẩm địa phương ("sources 80% of its products from farms within 100 miles").'
            },
            {
                id: 'p7-d2-3',
                question: 'What is NEW according to the advertisement?',
                options: ['Plastic bags', 'Farmers market', 'Café seating', 'Award ceremony'],
                correctAnswer: 2,
                explanation: 'Cà phê có chỗ ngồi là mới ("Organic café with seating for 30").'
            },
            {
                id: 'p7-d2-4',
                question: 'What prize is mentioned in the article?',
                options: ['$500 credit', '$10,000 grant', 'Free groceries', 'Magazine feature'],
                correctAnswer: 1,
                explanation: 'Bài báo đề cập giải $10,000 ("will receive a $10,000 grant").'
            },
            {
                id: 'p7-d2-5',
                question: 'When are cooking demonstrations held?',
                options: ['Every day', 'Weekdays', 'Saturdays', 'Sundays'],
                correctAnswer: 2,
                explanation: 'Demo nấu ăn vào thứ Bảy ("Cooking demos every Saturday").'
            }
        ]
    }
];

// Export for easy integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { part7Additional, part7DoublePassages };
}
