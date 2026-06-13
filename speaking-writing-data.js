// TOEIC Speaking & Writing Database

const speakingData = {
    title: "TOEIC Speaking Test",
    description: "Luyện tập 11 câu hỏi Speaking theo định dạng chuẩn TOEIC",
    questions: [
        // PART 1: Read a text aloud (Questions 1-2)
        {
            id: "sp-1",
            part: 1,
            partName: "Part 1: Read a text aloud",
            directions: "Directions: Read aloud the text on the screen. You will have 45 seconds to prepare and 45 seconds to read the text aloud.",
            prepTime: 45,
            respTime: 45,
            questionText: "Thank you for calling the Grand Theater booking hotline. Due to renovations, our box office is currently closed for walk-in purchases. However, you can easily book tickets for all upcoming plays and concerts through our official website at www.grandtheater.com. If you require assistance with group reservations of ten or more people, please stay on the line to speak with a customer service representative. We appreciate your patience and look forward to welcoming you to our new and improved venue next month.",
            sampleResponse: "Thank you for calling the Grand Theater booking hotline. Due to renovations, our box office is currently closed for walk-in purchases. However, you can easily book tickets for all upcoming plays and concerts through our official website at www.grandtheater.com. If you require assistance with group reservations of ten or more people, please stay on the line to speak with a customer service representative. We appreciate your patience and look forward to welcoming you to our new and improved venue next month.",
            tips: "Chú ý phát âm đúng các từ có âm cuối như 'theater', 'renovations', 'purchases', 'representative'. Ngắt nghỉ hơi hợp lý sau các dấu câu và giữ tốc độ đọc ổn định."
        },
        {
            id: "sp-2",
            part: 1,
            partName: "Part 1: Read a text aloud",
            directions: "Directions: Read aloud the text on the screen. You will have 45 seconds to prepare and 45 seconds to read the text aloud.",
            prepTime: 45,
            respTime: 45,
            questionText: "Attention all passengers waiting at Gate 14. We regret to inform you that departures for Flight 204 to Boston have been delayed by approximately forty-five minutes due to late-arriving aircraft cabin crew. We apologize for any inconvenience this schedule change may cause to your travel plans. Passengers with connecting flights in Boston should report immediately to the customer relations desk for assistance. We will provide updates on boarding procedures as soon as more information becomes available.",
            sampleResponse: "Attention all passengers waiting at Gate 14. We regret to inform you that departures for Flight 204 to Boston have been delayed by approximately forty-five minutes due to late-arriving aircraft cabin crew. We apologize for any inconvenience this schedule change may cause to your travel plans. Passengers with connecting flights in Boston should report immediately to the customer relations desk for assistance. We will provide updates on boarding procedures as soon as more information becomes available.",
            tips: "Tập trung nhấn giọng đúng các con số như 'Gate 14', 'Flight 204', 'forty-five' và các danh từ ghép như 'aircraft cabin crew', 'schedule change'."
        },
        // PART 2: Describe a picture (Questions 3-4)
        {
            id: "sp-3",
            part: 2,
            partName: "Part 2: Describe a picture",
            directions: "Directions: Describe the picture on your screen in as much detail as possible. You will have 45 seconds to prepare and 30 seconds to speak about the picture.",
            prepTime: 45,
            respTime: 30,
            imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            sampleResponse: "This is a picture taken in a modern conference room. In the center of the image, there is a large, polished wooden table surrounded by several black office chairs. On the table, we can see some notebooks, pens, and glasses of water neatly arranged. In the background, there is a large window that lets in a lot of natural light, offering a view of other office buildings. The overall atmosphere looks very professional, quiet, and ready for an upcoming business meeting.",
            tips: "Bố cục bài nói: 1. Tổng quan (Địa điểm: Phòng họp). 2. Chi tiết chính (Bàn gỗ lớn, ghế văn phòng). 3. Chi tiết phụ/Nền (Sổ ghi chép, cửa sổ lớn đón ánh sáng). 4. Cảm nghĩ chung (Không khí chuyên nghiệp)."
        },
        {
            id: "sp-4",
            part: 2,
            partName: "Part 2: Describe a picture",
            directions: "Directions: Describe the picture on your screen in as much detail as possible. You will have 45 seconds to prepare and 30 seconds to speak about the picture.",
            prepTime: 45,
            respTime: 30,
            imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            sampleResponse: "This picture shows a retail store scene, likely a clothing shop. On the right, a female cashier wearing a dark apron is smiling while handing a shopping bag to a customer. The customer, who is standing on the left, is receiving the bag and seems to be holding a credit card in her other hand. In the background, there are clothing racks with shirts hanging on hangers, and some shelves with items. The lighting is warm and bright, making the shopping experience look pleasant.",
            tips: "Mô tả hoạt động của người: Cashier đang cười và đưa túi đồ, Customer đang nhận túi và cầm thẻ. Dùng giới từ chỉ vị trí: 'on the right', 'on the left', 'in the background'."
        },
        // PART 3: Respond to questions (Questions 5-7)
        {
            id: "sp-5",
            part: 3,
            partName: "Part 3: Respond to questions",
            directions: "Directions: You will answer three questions about a topic. For each question, you will have 3 seconds to prepare, then 15 seconds to respond (for Q5 and Q6) and 30 seconds to respond (for Q7).",
            prepTime: 3,
            respTime: 15,
            topic: "Mobile Phones",
            questionText: "Question 5: How often do you upgrade your mobile phone, and where do you usually buy it?",
            sampleResponse: "I upgrade my mobile phone about once every two years. I usually buy it at an official brand store or a well-known electronics retail shop in my neighborhood to ensure it has a good warranty.",
            tips: "Trả lời trực tiếp 2 ý: Tần suất (once every two years) và địa điểm mua (official brand store)."
        },
        {
            id: "sp-6",
            part: 3,
            partName: "Part 3: Respond to questions",
            directions: "Directions: You will answer three questions about a topic. For each question, you will have 3 seconds to prepare, then 15 seconds to respond (for Q5 and Q6) and 30 seconds to respond (for Q7).",
            prepTime: 3,
            respTime: 15,
            topic: "Mobile Phones",
            questionText: "Question 6: What features do you consider most important when purchasing a new mobile phone?",
            sampleResponse: "When purchasing a new phone, the most important features to me are battery life and camera quality. I need a long-lasting battery for work and a good camera to take clear photos.",
            tips: "Đưa ra 1 hoặc 2 tính năng quan trọng và giải thích ngắn gọn lý do tại sao."
        },
        {
            id: "sp-7",
            part: 3,
            partName: "Part 3: Respond to questions",
            directions: "Directions: You will answer three questions about a topic. For each question, you will have 3 seconds to prepare, then 15 seconds to respond (for Q5 and Q6) and 30 seconds to respond (for Q7).",
            prepTime: 3,
            respTime: 30,
            topic: "Mobile Phones",
            questionText: "Question 7: Do you think it is better to buy a phone online or in a physical store? Explain why.",
            sampleResponse: "Personally, I believe it is much better to buy a mobile phone in a physical store. Firstly, you can test the device, hold it in your hand, and check the screen quality before paying. Secondly, store staff can immediately transfer your old data to the new phone and assist you in setting up the device, which saves a lot of time compared to waiting for online delivery.",
            tips: "Thời gian trả lời là 30 giây. Nên đưa ra ý kiến rõ ràng (in a physical store) và đưa ra 2 luận điểm bổ trợ (1. Trực tiếp trải nghiệm sản phẩm; 2. Được nhân viên hỗ trợ cài đặt)."
        },
        // PART 4: Respond to questions using information provided (Questions 8-10)
        {
            id: "sp-8",
            part: 4,
            partName: "Part 4: Respond to questions using info provided",
            directions: "Directions: Answer three questions based on the schedule provided. You will have 45 seconds to read the information. For each question, you will have 3 seconds to prepare, then 15 seconds to respond (for Q8 and Q9) and 30 seconds to respond (for Q10).",
            prepTime: 3,
            respTime: 15,
            hasTable: true,
            tableContent: `
                <div class="test-table-container">
                    <h4 style="text-align: center; margin-bottom: 0.5rem; color: var(--color-primary);">Annual Marketing Conference Schedule</h4>
                    <p style="text-align: center; font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: 1rem;">Date: October 18, 2026 | Location: Grand Hall, Plaza Hotel</p>
                    <table class="test-data-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--color-border); text-align: left;">
                                <th style="padding: 8px;">Time</th>
                                <th style="padding: 8px;">Event / Topic</th>
                                <th style="padding: 8px;">Presenter</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid var(--color-border);">
                                <td style="padding: 8px;">09:00 AM - 09:30 AM</td>
                                <td style="padding: 8px;">Registration & Welcome Coffee</td>
                                <td style="padding: 8px;">Conference Staff</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--color-border);">
                                <td style="padding: 8px;">09:30 AM - 11:00 AM</td>
                                <td style="padding: 8px;">Keynote Speech: Digital Marketing Trends 2027</td>
                                <td style="padding: 8px;">Sarah Jenkins, Director of TechCorp</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--color-border);">
                                <td style="padding: 8px;">11:00 AM - 12:00 PM</td>
                                <td style="padding: 8px;">Panel Discussion: Social Media Strategies</td>
                                <td style="padding: 8px;">Panelists from Top Agencies</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--color-border);">
                                <td style="padding: 8px;">12:00 PM - 01:30 PM</td>
                                <td style="padding: 8px;">Lunch Buffet (Complimentary)</td>
                                <td style="padding: 8px;">Hotel Restaurant</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--color-border);">
                                <td style="padding: 8px;">01:30 PM - 03:00 PM</td>
                                <td style="padding: 8px;">Workshop: Creating Viral Video Campaigns</td>
                                <td style="padding: 8px;">Marcus Thorne, Media Expert</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `,
            questionText: "Question 8: What date is the conference, and where is it located?",
            sampleResponse: "The Annual Marketing Conference will take place on October 18, 2026. It will be held at the Grand Hall in the Plaza Hotel.",
            tips: "Thông tin nằm ở tiêu đề bảng: Ngày 18/10/2026 và Địa điểm: Grand Hall, Plaza Hotel."
        },
        {
            id: "sp-9",
            part: 4,
            partName: "Part 4: Respond to questions using info provided",
            directions: "Directions: Answer three questions based on the schedule provided. You will have 45 seconds to read the information. For each question, you will have 3 seconds to prepare, then 15 seconds to respond (for Q8 and Q9) and 30 seconds to respond (for Q10).",
            prepTime: 3,
            respTime: 15,
            questionText: "Question 9: I heard that the Keynote Speech is in the afternoon. Is that correct?",
            sampleResponse: "Actually, that is incorrect. The Keynote Speech, titled 'Digital Marketing Trends 2027', is scheduled for the morning, from 9:30 AM to 11:00 AM.",
            tips: "Đính chính lịch trình: Khẳng định thông tin đó sai ('Actually, that is incorrect'), sau đó cung cấp thời gian đúng (9:30 AM - 11:00 AM)."
        },
        {
            id: "sp-10",
            part: 4,
            partName: "Part 4: Respond to questions using info provided",
            directions: "Directions: Answer three questions based on the schedule provided. You will have 45 seconds to read the information. For each question, you will have 3 seconds to prepare, then 15 seconds to respond (for Q8 and Q9) and 30 seconds to respond (for Q10).",
            prepTime: 3,
            respTime: 30,
            questionText: "Question 10: I am very interested in learning about content creation. Can you give me details about any session related to videos or content creation?",
            sampleResponse: "Sure, there is one session related to video content. From 1:30 PM to 3:00 PM, there is a workshop titled 'Creating Viral Video Campaigns'. This session will be led by Marcus Thorne, who is a media expert.",
            tips: "Đọc đầy đủ các thông tin của dòng Workshop lúc 1:30 PM: Tên workshop, thời gian, và người trình bày."
        },
        // PART 5: Express an opinion (Question 11)
        {
            id: "sp-11",
            part: 5,
            partName: "Part 5: Express an opinion",
            directions: "Directions: State your opinion about a topic. You will have 45 seconds to prepare and 60 seconds to speak. State your opinion clearly and support it with details and examples.",
            prepTime: 45,
            respTime: 60,
            questionText: "Question 11: Do you agree or disagree with the following statement? 'Working in a team is more beneficial for personal career growth than working individually.' Use specific reasons and examples to support your opinion.",
            sampleResponse: "I agree with the statement that working in a team is more beneficial for personal career growth than working individually. First of all, teamwork allows you to learn from your colleagues' experiences and diverse skills. For example, when I worked on a marketing project in a group, my co-workers shared valuable advice on data analysis, which helped me improve my own skills quickly. Secondly, collaborating with others improves communication and problem-solving abilities, which are highly valued by employers. It teaches you how to negotiate, resolve conflicts, and lead others, which are critical leadership skills for long-term career advancement. Therefore, I believe teamwork is key to professional growth.",
            tips: "Thời gian nói là 60 giây. Cấu trúc bài nói: 1. Đưa ra quan điểm đồng ý (Agree). 2. Lý do 1 + ví dụ thực tế (Learn from others + personal example). 3. Lý do 2 (Improve soft skills like negotiation/conflict resolution). 4. Kết luận."
        }
    ]
};

const writingData = {
    title: "TOEIC Writing Test",
    description: "Luyện tập 8 câu hỏi Writing theo định dạng chuẩn TOEIC",
    questions: [
        // PART 1: Write a sentence based on a picture (Questions 1-5)
        {
            id: "wr-1",
            part: 1,
            partName: "Part 1: Write a sentence based on a picture",
            directions: "Directions: Write ONE sentence that is based on the picture. The sentence must contain the two words or phrases given below the picture. You can change the forms of the words.",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            words: ["building", "construct"],
            sampleResponse: "The modern office building is being constructed in the downtown business district.",
            tips: "Viết một câu đúng ngữ pháp, bao hàm cả 2 từ khóa. Có thể chia thì động từ (ví dụ: 'construct' -> 'is being constructed')."
        },
        {
            id: "wr-2",
            part: 1,
            partName: "Part 1: Write a sentence based on a picture",
            directions: "Directions: Write ONE sentence that is based on the picture. The sentence must contain the two words or phrases given below the picture. You can change the forms of the words.",
            imageUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            words: ["meeting", "discuss"],
            sampleResponse: "The business partners are having a meeting to discuss their new project details.",
            tips: "Chú ý ghép từ khóa tự nhiên, ví dụ dùng cấu trúc 'have a meeting to discuss sth'."
        },
        {
            id: "wr-3",
            part: 1,
            partName: "Part 1: Write a sentence based on a picture",
            directions: "Directions: Write ONE sentence that is based on the picture. The sentence must contain the two words or phrases given below the picture. You can change the forms of the words.",
            imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            words: ["collaborate", "computer"],
            sampleResponse: "Several colleagues are collaborating on a task while looking at the computer screen.",
            tips: "Sử dụng giới từ đúng đi kèm từ khóa, ví dụ 'collaborate on a task'."
        },
        {
            id: "wr-4",
            part: 1,
            partName: "Part 1: Write a sentence based on a picture",
            directions: "Directions: Write ONE sentence that is based on the picture. The sentence must contain the two words or phrases given below the picture. You can change the forms of the words.",
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            words: ["documents", "desk"],
            sampleResponse: "There are many project documents scattered across the office desk.",
            tips: "Sử dụng danh từ số nhiều đúng ngữ pháp (documents) kết hợp với từ chỉ địa điểm (desk)."
        },
        {
            id: "wr-5",
            part: 1,
            partName: "Part 1: Write a sentence based on a picture",
            directions: "Directions: Write ONE sentence that is based on the picture. The sentence must contain the two words or phrases given below the picture. You can change the forms of the words.",
            imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            words: ["presentation", "whiteboard"],
            sampleResponse: "A woman is giving a sales presentation while pointing at the figures on the whiteboard.",
            tips: "Diễn đạt hoạt động của người trong ảnh: 'giving a presentation', 'pointing at the whiteboard'."
        },
        // PART 2: Respond to a written request (Questions 6-7)
        {
            id: "wr-6",
            part: 2,
            partName: "Part 2: Respond to a written request",
            directions: "Directions: Read the email below. Write a response that includes the two tasks described in the email. You will have 10 minutes to write your response.",
            timeLimit: 600, // 10 minutes in seconds
            emailPrompt: `
                <div class="email-prompt-box" style="border: 1px solid var(--color-border); padding: 15px; border-radius: 8px; background: rgba(255, 255, 255, 0.02); line-height: 1.6;">
                    <strong>From:</strong> customer.service@officeconnect.com<br>
                    <strong>To:</strong> John Doe (johndoe@email.com)<br>
                    <strong>Subject:</strong> Subscription Cancellation Request<br>
                    <strong>Date:</strong> October 12, 2026<br><br>
                    Dear Customer,<br>
                    We received your request to cancel your monthly subscription to OfficeConnect Premium. To help us improve our services, could you please respond to this email and:
                    <ol style="margin-left: 20px; margin-top: 5px;">
                        <li>State your main reason for wanting to cancel the subscription.</li>
                        <li>Suggest one feature or change that would make you consider subscribing again in the future.</li>
                    </ol>
                    We appreciate your feedback.<br><br>
                    Best regards,<br>
                    OfficeConnect Support Team
                </div>
            `,
            sampleResponse: `Dear OfficeConnect Support Team,

Thank you for your email. I am writing to respond to your questions regarding my subscription cancellation.

The main reason I decided to cancel my subscription is that my company recently transitioned to a different platform, so I no longer require the OfficeConnect Premium features for my daily work. 

However, I would definitely consider subscribing again in the future if you could introduce a more competitive pricing plan for individual users, or allow more integrations with external cloud storage services like Google Drive and Dropbox.

Thank you for your assistance.

Sincerely,
John Doe`,
            tips: "Email phản hồi cần: 1. Có chào hỏi trang trọng ('Dear...'). 2. Trả lời đầy đủ 2 yêu cầu trong email đề bài. 3. Kết thúc bằng câu chào lịch sự ('Best regards' / 'Sincerely') và ký tên."
        },
        {
            id: "wr-7",
            part: 2,
            partName: "Part 2: Respond to a written request",
            directions: "Directions: Read the email below. Write a response that includes the two tasks described in the email. You will have 10 minutes to write your response.",
            timeLimit: 600,
            emailPrompt: `
                <div class="email-prompt-box" style="border: 1px solid var(--color-border); padding: 15px; border-radius: 8px; background: rgba(255, 255, 255, 0.02); line-height: 1.6;">
                    <strong>From:</strong> hr@creativeminds.com<br>
                    <strong>To:</strong> Applicant (candidate@email.com)<br>
                    <strong>Subject:</strong> Interview Schedule Confirmation<br>
                    <strong>Date:</strong> October 15, 2026<br><br>
                    Dear Candidate,<br>
                    Thank you for applying for the Graphic Designer position at CreativeMinds. We have reviewed your portfolio and would like to invite you for a virtual interview next week. 
                    Please reply to this email to:
                    <ol style="margin-left: 20px; margin-top: 5px;">
                        <li>Propose two specific days and times when you are available for a 45-minute interview.</li>
                        <li>Ask at least one question about the interview process or the job role.</li>
                    </ol>
                    We look forward to speaking with you.<br><br>
                    Best regards,<br>
                    Elena Vance, HR Specialist
                </div>
            `,
            sampleResponse: `Dear Ms. Vance,

Thank you very much for inviting me to interview for the Graphic Designer position. I am very excited about this opportunity.

Regarding my availability, I would like to propose the following times next week:
1. Tuesday, October 20, at 10:00 AM.
2. Thursday, October 22, at 2:00 PM.

Additionally, I would like to ask if the virtual interview will include a practical design test, or if it will be a standard Q&A session.

Thank you for your time and guidance.

Best regards,
Candidate Name`,
            tips: "Nhớ đề xuất 2 khoảng thời gian cụ thể (ví dụ: Thứ Ba lúc 10h sáng và Thứ Năm lúc 2h chiều) và hỏi ít nhất 1 câu hỏi về quy trình phỏng vấn hoặc công việc."
        },
        // PART 3: Write an opinion essay (Question 8)
        {
            id: "wr-8",
            part: 3,
            partName: "Part 3: Write an opinion essay",
            directions: "Directions: Write an essay in response to the prompt below. You will have 30 minutes to plan, write, and revise your essay. A typical response should contain at least 300 words.",
            timeLimit: 1800, // 30 minutes in seconds
            questionText: "Question 8: Do you agree or disagree with the following statement? 'People should change jobs several times during their career rather than staying with a single employer for their entire working life.' Support your opinion with specific reasons and examples.",
            sampleResponse: `In today’s rapidly changing economic landscape, the traditional idea of working for a single company for one's entire career is becoming less common. Instead, many professionals choose to switch employers multiple times. In my opinion, changing jobs several times throughout a career is far more beneficial than staying with one employer because it offers greater opportunities for skill development and career advancement.

First of all, switching jobs allows workers to acquire a wider variety of skills and gain diverse experiences. Every company operates differently, using distinct software, management styles, and workflows. By working in different environments, an employee can adapt to new tools and methodologies, which makes them a more versatile and competitive candidate. For instance, a software engineer who works at both a small startup and a large corporation will learn how to build products quickly under pressure as well as manage large-scale systems. This combination of skills is hard to obtain by staying in a single company where the processes rarely change.

Secondly, changing jobs frequently accelerates career growth and financial promotions. Statistically, employees who stay at the same firm for a long time often receive lower annual salary increases compared to those who negotiate new contracts with different employers. When applying to a new firm, candidates have stronger leverage to negotiate higher compensation, better benefits, and higher positions, such as moving from a specialist to a managerial role. Furthermore, experiencing different organizational cultures prevents career stagnation and keeps individuals motivated to learn.

In conclusion, while staying with a single employer provides stability and comfort, I believe that changing jobs offers superior benefits. It enables professionals to expand their skill sets, remain versatile in a fluctuating market, and secure better career advancement. Therefore, job mobility is the key to thriving in the modern workforce.`,
            tips: "Bài luận cần tối thiểu 300 từ. Hãy lập dàn ý: 1. Introduction (Mở bài nêu quan điểm). 2. Body Paragraph 1 (Lợi ích về phát triển kỹ năng + Ví dụ). 3. Body Paragraph 2 (Lợi ích về thăng tiến & thu nhập). 4. Conclusion (Kết bài khẳng định lại quan điểm)."
        }
    ]
};

// Export to window object for browser access
window.speakingData = speakingData;
window.writingData = writingData;
