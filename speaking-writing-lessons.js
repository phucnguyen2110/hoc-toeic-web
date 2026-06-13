// TOEIC Speaking & Writing Study Guide Lessons Data

const lessonsData = {
    speaking: [
        {
            id: "les-sp-1",
            part: 1,
            title: "Part 1: Read a Text Aloud",
            overview: "Bạn có 2 câu hỏi (Q1-Q2). Thời gian chuẩn bị: 45 giây. Thời gian đọc: 45 giây. Mục tiêu: Đọc to văn bản trôi chảy, phát âm đúng, ngữ điệu tự nhiên.",
            criteria: "Phát âm (Pronunciation), Ngữ điệu & Trọng âm (Intonation & Stress), Độ trôi chảy (Fluency).",
            strategies: [
                "Tận dụng 45 giây chuẩn bị để đọc nhẩm, xác định các từ khó phát âm và các cụm danh từ cần ngắt hơi.",
                "Chuẩn hóa phát âm phụ âm và nguyên âm theo bảng ký tự phiên âm quốc tế IPA.",
                "Trọng âm từ (Word Stress): Nhấn mạnh nguyên âm của âm tiết mang trọng âm. Hầu hết các danh từ/tính từ 2 âm tiết nhấn âm 1, động từ 2 âm tiết nhấn âm 2.",
                "Ngắt giọng (Pause) hợp lý: Ngắt ngắn sau các cụm từ ý nghĩa, ngắt dài hơn ở dấu phẩy và dấu chấm.",
                "Quy tắc ngữ điệu khi liệt kê (A, B, and C): Lên giọng ở các mục trước và xuống giọng ở mục cuối cùng (ví dụ: tables [lên], chairs [lên], and desks [xuống]).",
                "Phát âm rõ ràng các phụ âm cuối (Ending sounds): đặc biệt là '-s', '-es', '-ed', '-t', '-d'.",
                "Phát âm đuôi '-ed': Đọc /id/ sau âm /t/, /d/; đọc /t/ sau phụ âm vô thanh (/s/, /p/, /k/, /f/, /sh/, /ch/); đọc /d/ cho các trường hợp còn lại.",
                "Phát âm đuôi '-s/es': Đọc /iz/ sau âm rít (/s/, /z/, /sh/, /ch/, /x/); đọc /s/ sau phụ âm vô thanh (/p/, /t/, /k/, /f/, /th/); đọc /z/ cho trường hợp còn lại."
            ],
            templates: [
                {
                    useCase: "Quy tắc lên giọng ở câu hỏi Yes/No:",
                    pattern: "Are you ready to begin? [Lên giọng ở cuối câu]"
                },
                {
                    useCase: "Quy tắc xuống giọng ở câu trần thuật hoặc câu hỏi Wh-:",
                    pattern: "Thank you for choosing our service. [Xuống giọng ở cuối câu]\nWhat is the purpose of your visit? [Xuống giọng ở cuối câu]"
                }
            ],
            examples: `
                <div class="lesson-step-box">
                    <strong>Đoạn văn ví dụ luyện ngắt nghỉ hơi:</strong><br>
                    <p style="font-style: italic; line-height: 1.8; margin-top: 5px;">
                        "Welcome to the annual tech expo. [nghỉ] Today, we will showcase software [lên], hardware [lên], and artificial intelligence. [xuống] Please visit our booths, [nghỉ] talk with our specialists, [nghỉ] and enjoy the presentations."
                    </p>
                </div>
            `
        },
        {
            id: "les-sp-2",
            part: 2,
            title: "Part 2: Describe a Picture",
            overview: "Bạn có 2 câu hỏi (Q3-Q4). Thời gian chuẩn bị: 45 giây. Thời gian nói: 30 giây. Mục tiêu: Mô tả chi tiết và logic một bức tranh trên màn hình.",
            criteria: "Độ trôi chảy, Ngữ pháp, Từ vựng phong phú, Bố cục rõ ràng.",
            strategies: [
                "Áp dụng quy tắc đi từ Tổng quan đến Chi tiết: Địa điểm $\rightarrow$ Đối tượng chính (người) $\rightarrow$ Cảnh nền xung quanh $\rightarrow$ Cảm xúc/Nhận xét chung.",
                "Sử dụng các giới từ chỉ vị trí chính xác (on the left, in the foreground, in the background).",
                "Mô tả người: dùng thì Hiện tại tiếp diễn (He is typing..., She is smiling...) và mô tả trang phục, tư thế.",
                "Khi gặp vật không biết tên, dùng từ chung chung: 'some items', 'equipment', 'various goods'."
            ],
            templates: [
                {
                    useCase: "Mở đầu mô tả (Tổng quan):",
                    pattern: "This is a picture taken in/at [địa điểm: an office, a coffee shop...]"
                },
                {
                    useCase: "Mô tả tiêu điểm (Người):",
                    pattern: "In the center of the picture, I can see a man who is [động từ -ing: working, talking...]\nHe/She is wearing [trang phục]"
                },
                {
                    useCase: "Mô tả cảnh nền (Vật):",
                    pattern: "In the background, there is/are [vật]\nOn the left/right side of the picture, some [vật] are arranged..."
                },
                {
                    useCase: "Kết luận / Cảm nghĩ:",
                    pattern: "Overall, the atmosphere looks very [nhận xét: professional, peaceful, busy...]"
                }
            ],
            examples: `
                <div class="lesson-step-box">
                    <strong>Sơ đồ mô tả tranh trong 30 giây:</strong>
                    <ol style="margin-left: 20px; margin-top: 10px; display: flex; flex-direction: column; gap: 5px;">
                        <li><strong>0-5s:</strong> Giới thiệu địa điểm (This is a picture taken in a library...)</li>
                        <li><strong>5-20s:</strong> Tả người chính (A woman is sitting at the table, writing in a book...)</li>
                        <li><strong>20-25s:</strong> Tả đồ vật xung quanh (Behind her, there are shelves filled with books...)</li>
                        <li><strong>25-30s:</strong> Kết câu cảm nghĩ (It looks like a quiet place to study.)</li>
                    </ol>
                </div>
            `
        },
        {
            id: "les-sp-3",
            part: 3,
            title: "Part 3: Respond to Questions",
            overview: "Bạn có 3 câu hỏi (Q5-Q7). Không có thời gian chuẩn bị trên đề thi thật (hệ thống cho 3s). Thời gian trả lời: 15 giây cho Q5, Q6 và 30 giây cho Q7. Mục tiêu: Trả lời tự nhiên, nhanh chóng câu hỏi phỏng vấn.",
            criteria: "Trả lời trực tiếp, rõ ý, độ lưu loát, độ dài tương xứng với thời gian.",
            strategies: [
                "Q5 & Q6 (15s): Trả lời thẳng vào câu hỏi ngay giây đầu tiên, sau đó thêm 1 câu giải thích ngắn gọn.",
                "Q7 (30s): Cần có lập trường rõ ràng và đưa ra 2 lý do hoặc 1 lý do chi tiết đi kèm ví dụ cụ thể để lấp đầy 30 giây.",
                "Sử dụng các từ nối ý (First of all, In addition, Because) để bài nói mạch lạc.",
                "Dùng cụm từ đệm (filler phrases) nếu cần 1-2 giây suy nghĩ, tránh im lặng hoàn toàn."
            ],
            templates: [
                {
                    useCase: "Cụm từ đệm khi cần suy nghĩ:",
                    pattern: "That is an interesting question...\nTo be honest, I haven't thought about it before, but..."
                },
                {
                    useCase: "Cấu trúc trả lời trực tiếp:",
                    pattern: "I usually [hành động] about [tần suất: once a week/month] because..."
                },
                {
                    useCase: "Lập luận cho Q7 (30 giây):",
                    pattern: "I think it is better to [quan điểm] for two reasons. First of all, [lý do 1]. Secondly, [lý do 2]. That's why I prefer..."
                }
            ],
            examples: `
                <div class="lesson-step-box">
                    <strong>Mẹo lấp đầy 30 giây cho Q7:</strong><br>
                    <p style="margin-top: 5px; color: var(--color-text-secondary);">
                        Thay vì chỉ nói "I agree because it is cheap", hãy mở rộng: <br>
                        "I agree with the statement. Personally, buying goods online is very convenient. For example, last week, I ordered a book and it was delivered to my house within one day. It saved me a lot of time."
                    </p>
                </div>
            `
        },
        {
            id: "les-sp-4",
            part: 4,
            title: "Part 4: Respond to Questions Using Info Provided",
            overview: "Bạn có 3 câu hỏi (Q8-Q10). Thời gian đọc bảng biểu: 45 giây. Thời gian trả lời: 15s cho Q8, Q9 và 30s cho Q10. Mục tiêu: Đọc bảng thông tin để trả lời thắc mắc của khách hàng/đối tác.",
            criteria: "Thông tin chính xác 100% so với bảng biểu, ngữ pháp câu trả lời đúng.",
            strategies: [
                "Tận dụng 45s đọc bảng để lướt qua: Tiêu đề (tên hội thảo/chuyến đi), Thời gian/Địa điểm, và các thông tin đặc biệt (gạch chéo, hủy bỏ, thay đổi người thuyết trình).",
                "Q8: Thường hỏi về thời gian bắt đầu, kết thúc hoặc địa điểm. Cần trả lời đầy đủ giới từ (at [giờ], on [ngày], in [phòng]).",
                "Q9: Thường đưa ra thông tin SAI để bạn đính chính. Hãy bắt đầu bằng cách phủ định nhẹ nhàng ('Actually, that's not correct...') rồi đưa ra thông tin đúng.",
                "Q10: Thường yêu cầu liệt kê tất cả các phiên họp của 1 người cụ thể hoặc về 1 chủ đề cụ thể. Đọc mạch lạc tất cả các dòng tương ứng."
            ],
            templates: [
                {
                    useCase: "Mẫu câu chỉ Thời gian & Địa điểm (Q8):",
                    pattern: "It is scheduled to start at [giờ] on [ngày/tháng] in [phòng/địa điểm]."
                },
                {
                    useCase: "Mẫu câu đính chính thông tin sai (Q9):",
                    pattern: "Actually, I'm sorry but that is not correct. According to the schedule, [đính chính tin đúng]."
                },
                {
                    useCase: "Mẫu câu liệt kê các buổi (Q10):",
                    pattern: "Sure, there are two scheduled sessions. First, from [giờ] to [giờ], there is [sự kiện] presented by [tên]. Second, at [giờ]..."
                }
            ],
            examples: `
                <div class="lesson-step-box">
                    <strong>Bảng tra cứu cách đọc số liệu:</strong>
                    <ul style="margin-left: 20px; margin-top: 5px; display: flex; flex-direction: column; gap: 5px;">
                        <li><strong>Giờ:</strong> 9:00 AM $\rightarrow$ read "nine AM" hoặc "nine o'clock in the morning".</li>
                        <li><strong>Phòng:</strong> Room 102 $\rightarrow$ read "Room one-oh-two".</li>
                        <li><strong>Hủy bỏ/Thay đổi:</strong> Cancelled $\rightarrow$ read "Please note that this session has been cancelled."</li>
                    </ul>
                </div>
            `
        },
        {
            id: "les-sp-5",
            part: 5,
            title: "Part 5: Express an Opinion",
            overview: "Bạn có 1 câu hỏi (Q11). Thời gian chuẩn bị: 45 giây. Thời gian nói: 60 giây. Mục tiêu: Trình bày bài phát biểu ngắn thể hiện rõ lập trường đồng ý/phản đối hoặc sự lựa chọn đối với một chủ đề xã hội/công việc.",
            criteria: "Tính thuyết phục của lập luận, Bố cục bài nói (Mở - Thân - Kết), Từ vựng và Ngữ pháp phức tạp.",
            strategies: [
                "Cấu trúc bài nói lý tưởng: 1. Introduction (nêu rõ đồng ý/phản đối/lựa chọn) $\rightarrow$ 2. Body 1 (Lý do thứ nhất + Ví dụ hỗ trợ) $\rightarrow$ 3. Body 2 (Lý do thứ hai hoặc mở rộng thêm ý) $\rightarrow$ 4. Conclusion (Khẳng định lại luận điểm).",
                "Sử dụng ví dụ thực tế cá nhân (Personal experience) để kéo dài thời gian nói thuyết phục: 'In my case...', 'For instance, when I was in university...'.",
                "Luyện tập kiểm soát tốc độ để nói trôi chảy trong đúng 60 giây, tránh nói quá nhanh dẫn đến thiếu thời gian cuối bài."
            ],
            templates: [
                {
                    useCase: "Đoạn Mở bài (Introduction):",
                    pattern: "I agree/disagree with the statement that [đề bài] for a few reasons.\nIn my opinion, it is better to [lựa chọn] because..."
                },
                {
                    useCase: "Thân bài - Đưa lý do và ví dụ:",
                    pattern: "First of all, [lý do 1]. For example, in my experience, [ví dụ].\nSecondly, [lý do 2]. Furthermore, [giải thích thêm]."
                },
                {
                    useCase: "Đoạn Kết bài (Conclusion):",
                    pattern: "Therefore, for these reasons, I strongly believe that [khẳng định lại quan điểm]."
                }
            ],
            examples: `
                <div class="lesson-step-box">
                    <strong>Khung sườn kiểm soát thời gian bài 60 giây:</strong>
                    <ul style="margin-left: 20px; margin-top: 5px; display: flex; flex-direction: column; gap: 5px;">
                        <li><strong>0s - 10s:</strong> Nêu ý kiến chủ đạo (Introduction).</li>
                        <li><strong>10s - 35s:</strong> Luận điểm 1 + Ví dụ cá nhân chi tiết (Body 1).</li>
                        <li><strong>35s - 55s:</strong> Luận điểm 2 + Diễn giải ngắn gọn (Body 2).</li>
                        <li><strong>55s - 60s:</strong> Kết bài chốt hạ (Conclusion).</li>
                    </ul>
                </div>
            `
        }
    ],
    writing: [
        {
            id: "les-wr-1",
            part: 1,
            title: "Part 1: Write a Sentence Based on a Picture",
            overview: "Bạn có 5 bức tranh (Q1-Q5). Thời gian làm bài tổng cộng: 8 phút. Mục tiêu: Viết 1 câu hoàn chỉnh cho mỗi tranh có sử dụng chính xác 2 từ khóa gợi ý và mô tả đúng ngữ cảnh tranh.",
            criteria: "Sử dụng đúng 2 từ khóa gợi ý, Ngữ pháp câu chính xác 100%, Câu mô tả đúng nội dung bức tranh.",
            strategies: [
                "Bắt buộc phải dùng cả 2 từ gợi ý. Bạn được phép thay đổi dạng thức từ (ví dụ danh từ số ít/nhiều, chia thì động từ, thể bị động/chủ động).",
                "Sử dụng đúng các thì cơ bản (Hiện tại đơn, Hiện tại tiếp diễn, Quá khứ đơn, Tương lai đơn) tùy theo ngữ cảnh của tranh vẽ.",
                "Nắm vững các dạng của động từ: Danh động từ (V-ing) sau động từ chỉ sở thích/bắt đầu, Động từ nguyên mẫu (To V) sau động từ chỉ dự định/mong muốn.",
                "Sử dụng câu bị động (Passive voice) khi mô tả vật thể đang được tác động (Ví dụ: The document is being printed).",
                "Áp dụng cấu trúc câu điều kiện loại 1 (Conditional Type 1) để dự đoán tình huống có thể xảy ra trong tranh (If they finish their work, they will...).",
                "Nên viết câu phức (Complex sentences) hoặc câu ghép (Compound sentences) bằng cách dùng liên từ như `because`, `although`, `while`, `and`, `but` để kết nối 2 từ gợi ý một cách tự nhiên."
            ],
            templates: [
                {
                    useCase: "Mẫu câu dùng liên từ chỉ nguyên nhân (because/since):",
                    pattern: "[Chủ ngữ] [động từ] [từ khóa 1] because [chủ ngữ] [động từ] [từ khóa 2]."
                },
                {
                    useCase: "Mẫu câu dùng liên từ thời gian (while/when):",
                    pattern: "While [chủ ngữ] is [động từ-ing] [từ khóa 1], another person is [từ khóa 2]."
                },
                {
                    useCase: "Mẫu câu bị động mô tả vật:",
                    pattern: "[Chủ ngữ/Vật] is being [động từ V3 - từ khóa 1] near the [từ khóa 2]."
                }
            ],
            examples: `
                <div class="lesson-step-box">
                    <strong>Ví dụ áp dụng thực tế:</strong><br>
                    Từ khóa: <strong>staff</strong> (danh từ) & <strong>train</strong> (động từ)<br>
                    <ul style="margin-left: 20px; margin-top: 5px; display: flex; flex-direction: column; gap: 5px;">
                        <li><span style="color: var(--color-error);">✗ Viết sai (thiếu chủ ngữ/động từ):</span> "Staff train on computers."</li>
                        <li><span style="color: var(--color-success);">✓ Viết đúng (câu đơn):</span> "The staff is being trained on how to use new computers."</li>
                        <li><span style="color: var(--color-success);">✓ Viết xuất sắc (câu phức):</span> "Although the training session was difficult, all staff members managed to complete it on time."</li>
                    </ul>
                </div>
            `
        },
        {
            id: "les-wr-2",
            part: 2,
            title: "Part 2: Respond to a Written Request",
            overview: "Bạn có 2 câu hỏi (Q6-Q7). Thời gian làm bài: 10 phút cho mỗi email. Mục tiêu: Viết một email phản hồi hoàn chỉnh trả lời đầy đủ 2 yêu cầu được đặt ra trong email đề bài.",
            criteria: "Bố cục email chuẩn xác, Trả lời đầy đủ 2 yêu cầu, Sử dụng từ vựng và ngữ pháp thương mại phù hợp.",
            strategies: [
                "Bố cục email phải có đầy đủ 4 phần: Lời chào (Dear...) $\rightarrow$ Mục đích viết email $\rightarrow$ Nội dung chính (đáp ứng đủ 2 yêu cầu đề bài) $\rightarrow$ Lời kết & ký tên (Sincerely/Best regards).",
                "Sử dụng từ vựng thương mại (ESP) liên quan đến: Tài chính (budget, transaction), Tiếp thị (marketing, campaign), Nhân sự (recruit, employee, benefits), Thiết bị văn phòng (photocopier, printer, supplies), Hợp đồng (agreement, term, client).",
                "Đọc kỹ đề bài để xác định đối tượng nhận email (khách hàng, đồng nghiệp hay sếp) để sử dụng giọng điệu (tone) trang trọng hoặc thân mật phù hợp.",
                "Với mỗi yêu cầu trong email đề bài, hãy viết riêng biệt từ 1-2 câu để bảo đảm rõ ý và người chấm dễ dàng nhìn thấy."
            ],
            templates: [
                {
                    useCase: "Bộ khung Email công việc hoàn chỉnh:",
                    pattern: "Dear [Tên người nhận],\n\nThank you for your email regarding [chủ đề].\nI am writing to respond to your requests.\nFirst, [giải quyết yêu cầu 1].\nSecond, [giải quyết yêu cầu 2].\n\nPlease let me know if you have further questions.\n\nBest regards,\n[Tên của bạn]"
                }
            ],
            examples: `
                <div class="lesson-step-box">
                    <strong>Phân tích ví dụ yêu cầu đính kèm:</strong><br>
                    Đề bài yêu cầu: 1. Giải thích lý do hủy dịch vụ. 2. Đề xuất cải tiến.<br>
                    <p style="font-style: italic; line-height: 1.6; margin-top: 5px; color: var(--color-text-secondary);">
                        "Regarding your request, the main reason I cancelled my subscription is that I no longer use the software due to a change in my project (yêu cầu 1). However, I would suggest adding more online storage space, which would make me reconsider subscribing in the future (yêu cầu 2)."
                    </p>
                </div>
            `
        },
        {
            id: "les-wr-3",
            part: 3,
            title: "Part 3: Write an Opinion Essay",
            overview: "Bạn có 1 câu hỏi (Q8). Thời gian làm bài: 30 phút. Mục tiêu: Viết một bài luận tối thiểu 300 từ trình bày ý kiến đồng ý/phản đối về một luận điểm xã hội hoặc công việc.",
            criteria: "Bố cục bài luận chuẩn (Mở - Thân - Kết), Phát triển luận điểm logic và có ví dụ thuyết phục, Sự chính xác của ngữ pháp và vốn từ vựng học thuật.",
            strategies: [
                "Cấu trúc bài luận bắt buộc phải chia làm 4 đoạn rõ ràng:<br>1. **Introduction** (Mở bài): Nêu chủ đề và lập trường (đồng ý/phản đối).<br>2. **Body 1 & 2** (Thân bài): Đưa ra 2 lý do lớn kèm ví dụ và lập luận logic.<br>3. **Conclusion** (Kết bài): Tóm tắt luận điểm và chốt ý kiến.",
                "Áp dụng cấu trúc nâng cao (600 - 800+) để ghi điểm tuyệt đối: Câu đảo ngữ (Ví dụ: Not only... but also...), Câu giả định (Ví dụ: It is recommended that [Chủ ngữ] + V nguyên mẫu).",
                "Sử dụng nhóm từ vựng quản trị cao cấp: Quản lý chuỗi cung ứng (supply chain, logistics), Pháp lý & Tuân thủ (regulation, compliance), An ninh mạng (cybersecurity, security breach), Đa dạng hóa văn hóa doanh nghiệp (DEI - diversity, equity, inclusion).",
                "Sử dụng các từ nối ý trang trọng ở đầu mỗi đoạn (First of all, On the other hand, Consequently, In conclusion)."
            ],
            templates: [
                {
                    useCase: "Cấu trúc Mở bài (Introduction):",
                    pattern: "In today's society, [chủ đề] is becoming increasingly important. In my opinion, I strongly agree/disagree with the statement that [đề bài] because of two main reasons."
                },
                {
                    useCase: "Cấu trúc Thân bài (Body):",
                    pattern: "First of all, [luận điểm 1]. This is because [giải thích]. For instance, [ví dụ thực tế]. Therefore, [tóm tắt luận điểm].\nSecondly, [luận điểm 2]. In addition, [giải thích]..."
                },
                {
                    useCase: "Cấu trúc Kết bài (Conclusion):",
                    pattern: "In conclusion, although some people might argue otherwise, I believe that [nhắc lại quan điểm] because [tóm tắt ý 1] and [tóm tắt ý 2]."
                }
            ],
            examples: `
                <div class="lesson-step-box">
                    <strong>Bảng các từ nối liên kết bài luận ăn điểm:</strong>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 5px; font-size: 0.9rem;">
                        <tr style="border-bottom: 1px solid var(--color-border);">
                            <td style="padding: 5px; font-weight: bold;">Mục đích</td>
                            <td style="padding: 5px;">Từ liên kết khuyên dùng</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--color-border);">
                            <td style="padding: 5px; font-weight: bold;">Đầu đoạn</td>
                            <td style="padding: 5px;">First of all, To begin with, Secondly, Furthermore</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--color-border);">
                            <td style="padding: 5px; font-weight: bold;">Đưa ví dụ</td>
                            <td style="padding: 5px;">For instance, For example, To illustrate</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; font-weight: bold;">Kết luận</td>
                            <td style="padding: 5px;">In conclusion, To sum up, On the whole</td>
                        </tr>
                    </table>
                </div>
            `
        }
    ]
};

// Export to window object
window.lessonsData = lessonsData;
