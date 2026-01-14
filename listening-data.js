// TOEIC Listening Practice Tests
// Format: Part 1 (6 câu) + Part 2 (25 câu) + Part 3 (39 câu) + Part 4 (30 câu) = 100 câu, 45 phút

const listeningTests = {
    tests: [
        {
            id: 'full-listening-1',
            name: 'TOEIC Listening Full Test 1',
            description: 'Đề thi Listening đầy đủ 100 câu - Format chuẩn TOEIC',
            duration: 45, // minutes
            totalQuestions: 100,
            type: 'listening',
            sections: [
                {
                    id: 'part1',
                    name: 'PART 1: PHOTOGRAPHS',
                    description: 'Directions: For each question in this part, you will hear four statements about a picture in your test book. When you hear the statements, you must select the one statement that best describes what you see in the picture.',
                    questionCount: 6,
                    questions: [
                        {
                            id: 'l-p1-1',
                            questionNumber: 1,
                            imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                            audioScript: 'A. They are shaking hands.\nB. They are looking at a document.\nC. They are sitting at a table.\nD. They are walking down the hallway.',
                            options: ['A', 'B', 'C', 'D'],
                            correctAnswer: 1, // B
                            explanation: 'Trong hình 2 người đang cùng nhìn vào một tài liệu. (B) They are looking at a document.'
                        },
                        {
                            id: 'l-p1-2',
                            questionNumber: 2,
                            imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                            audioScript: 'A. She is typing on a keyboard.\nB. She is talking on the phone.\nC. She is drinking coffee.\nD. She is opening a window.',
                            options: ['A', 'B', 'C', 'D'],
                            correctAnswer: 0, // A
                            explanation: 'Người phụ nữ đang gõ bàn phím. (A) She is typing on a keyboard.'
                        },
                        {
                            id: 'l-p1-3',
                            questionNumber: 3,
                            imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                            audioScript: 'A. The students are reading books.\nB. The teacher is writing on the whiteboard.\nC. They are listening to a presentation.\nD. The room is empty.',
                            options: ['A', 'B', 'C', 'D'],
                            correctAnswer: 2, // C
                            explanation: 'Nhóm người đang chăm chú lắng nghe một người trình bày. (C) They are listening to a presentation.'
                        },
                        {
                            id: 'l-p1-4',
                            questionNumber: 4,
                            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                            audioScript: 'A. She is putting on a safety helmet.\nB. She is holding a tablet computer.\nC. She is climbing a ladder.\nD. She is operating heavy machinery.',
                            options: ['A', 'B', 'C', 'D'],
                            correctAnswer: 1, // B
                            explanation: 'Người phụ nữ đang cầm một chiếc máy tính bảng. (B) She is holding a tablet computer.'
                        },
                        {
                            id: 'l-p1-5',
                            questionNumber: 5,
                            imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                            audioScript: 'A. The man is arranging flowers.\nB. He is serving food to customers.\nC. He is cleaning the table.\nD. He is writing in a notebook.',
                            options: ['A', 'B', 'C', 'D'],
                            correctAnswer: 1, // B
                            explanation: 'Người đàn ông đang phục vụ thức ăn. (B) He is serving food to customers.'
                        },
                        {
                            id: 'l-p1-6',
                            questionNumber: 6,
                            imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                            audioScript: 'A. They are examining a machine.\nB. They are painting a wall.\nC. They are driving a car.\nD. They are planting trees.',
                            options: ['A', 'B', 'C', 'D'],
                            correctAnswer: 0, // A
                            explanation: 'Hai người đang kiểm tra một chiếc máy. (A) They are examining a machine.'
                        }
                    ]
                },
                {
                    id: 'part2',
                    name: 'PART 2: QUESTION-RESPONSE',
                    description: 'Directions: You will hear a question or statement and three responses spoken in English. Select the best response to the question or statement.',
                    questionCount: 25,
                    questions: [
                        {
                            id: 'l-p2-7',
                            questionNumber: 7,
                            audioScript: 'Question: When does the meeting start?\nA. In Conference Room B.\nB. At 2 o\'clock.\nC. Yes, I will receive it.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 1,
                            explanation: 'Câu hỏi When (khi nào) -> Trả lời thời gian. (B) At 2 o\'clock.'
                        },
                        {
                            id: 'l-p2-8',
                            questionNumber: 8,
                            audioScript: 'Question: Who is responsible for this project?\nA. Mr. Tanaka is.\nB. It\'s a new project.\nC. By next Monday.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Câu hỏi Who (ai) -> Trả lời tên người. (A) Mr. Tanaka is.'
                        },
                        {
                            id: 'l-p2-9',
                            questionNumber: 9,
                            audioScript: 'Question: Where did you put the file folder?\nA. It\'s on my desk.\nB. I filed a complaint.\nC. To the accountant.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Câu hỏi Where (ở đâu) -> Trả lời vị trí "on my desk".'
                        },
                        {
                            id: 'l-p2-10',
                            questionNumber: 10,
                            audioScript: 'Question: Would you like coffee or tea?\nA. Yes, please.\nB. I prefer coffee.\nC. It\'s not expensive.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 1,
                            explanation: 'Câu hỏi lựa chọn (or) -> Chọn một trong hai. "I prefer coffee".'
                        },
                        {
                            id: 'l-p2-11',
                            questionNumber: 11,
                            audioScript: 'Question: Why was the train delayed?\nA. About 20 minutes.\nB. Because of the snow.\nC. Platform 4.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 1,
                            explanation: 'Câu hỏi Why (tại sao) -> Trả lời lý do "Because of...".'
                        },
                        {
                            id: 'l-p2-12',
                            questionNumber: 12,
                            audioScript: 'Question: How often do you visit the headquarters?\nA. Twice a month.\nB. It\'s in New York.\nC. I visited last week.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'How often (bao lâu 1 lần) -> Tần suất "Twice a month".'
                        },
                        {
                            id: 'l-p2-13',
                            questionNumber: 13,
                            audioScript: 'Question: Did you finish the report yet?\nA. No, I\'m still working on it.\nB. It was a good report.\nC. Yes, she is.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Câu hỏi Yes/No. (A) No, I\'m still working on it.'
                        },
                        {
                            id: 'l-p2-14',
                            questionNumber: 14,
                            audioScript: 'Question: Who\'s leading the seminar tomorrow?\nA. At 9 AM sharp.\nB. Dr. Smith is.\nC. In the auditorium.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 1,
                            explanation: 'Who (ai) -> Dr. Smith is.'
                        },
                        {
                            id: 'l-p2-15',
                            questionNumber: 15,
                            audioScript: 'Question: Can you help me move these boxes?\nA. Sure, I\'d be happy to.\nB. They are heavy.\nC. The moving company.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Đề nghị giúp đỡ -> Đồng ý "Sure, I\'d be happy to".'
                        },
                        {
                            id: 'l-p2-16',
                            questionNumber: 16,
                            audioScript: 'Question: The printer is out of ink again.\nA. I\'ll order some more cartridge.\nB. Print it in color.\nC. It is brand new.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Câu trần thuật về sự cố -> Đưa ra giải pháp "I\'ll order some more".'
                        },
                        {
                            id: 'l-p2-17',
                            questionNumber: 17,
                            audioScript: 'Question: Aren\'t you going to the party tonight?\nA. No, I have to work late.\nB. Yes, it was fun.\nC. The party starts at 7.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Câu hỏi phủ định -> Trả lời lý do không đi "No, I have to work late".'
                        },
                        {
                            id: 'l-p2-18',
                            questionNumber: 18,
                            audioScript: 'Question: How much does this laptop cost?\nA. It weighs 2 kilograms.\nB. About $800.\nC. I bought it online.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 1,
                            explanation: 'How much (giá bao nhiêu) -> "About $800".'
                        },
                        {
                            id: 'l-p2-19',
                            questionNumber: 19,
                            audioScript: 'Question: When is the deadline for the project?\nA. Next Friday.\nB. To the manager.\nC. It\'s a long project.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'When (khi nào) -> "Next Friday".'
                        },
                        {
                            id: 'l-p2-20',
                            questionNumber: 20,
                            audioScript: 'Question: Do you know where the post office is?\nA. I sent the letter.\nB. It\'s around the corner.\nC. No, I don\'t have stamps.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 1,
                            explanation: 'Hỏi đường -> Chỉ dẫn "It\'s around the corner".'
                        },
                        {
                            id: 'l-p2-21',
                            questionNumber: 21,
                            audioScript: 'Question: Why is the office so quiet today?\nA. Many people are on vacation.\nB. Speak louder, please.\nC. I like quiet music.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Lý do vắng vẻ -> "Many people are on vacation".'
                        },
                        {
                            id: 'l-p2-22',
                            questionNumber: 22,
                            audioScript: 'Question: Shall we take a taxi or the bus?\nA. The bus is cheaper.\nB. Yes, let\'s go.\nC. It\'s raining.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Lựa chọn phương tiện -> Chọn bus vì rẻ hơn.'
                        },
                        {
                            id: 'l-p2-23',
                            questionNumber: 23,
                            audioScript: 'Question: I think we should update the website.\nA. That\'s a great idea.\nB. The site is down.\nC. Last month.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Đưa ra ý kiến -> Đồng tình "That\'s a great idea".'
                        },
                        {
                            id: 'l-p2-24',
                            questionNumber: 24,
                            audioScript: 'Question: Who approved the budget proposal?\nA. By the end of the day.\nB. The finance director did.\nC. It was rejected.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 1,
                            explanation: 'Who (ai) -> "The finance director did".'
                        },
                        {
                            id: 'l-p2-25',
                            questionNumber: 25,
                            audioScript: 'Question: Have you met the new intern yet?\nA. Yes, she seems very capable.\nB. Since last year.\nC. In the lobby.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Have you met... -> "Yes, she seems very capable".'
                        },
                        {
                            id: 'l-p2-26',
                            questionNumber: 26,
                            audioScript: 'Question: Where can I park my car?\nA. In the garage downstairs.\nB. I don\'t have a car.\nC. The park is beautiful.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Where (ở đâu) -> "In the garage downstairs".'
                        },
                        {
                            id: 'l-p2-27',
                            questionNumber: 27,
                            audioScript: 'Question: Could you review this document for me?\nA. I read it yesterday.\nB. I\'m busy right now, maybe later.\nC. It\'s a long document.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 1,
                            explanation: 'Yêu cầu giúp đỡ -> Từ chối lịch sự "I\'m busy right now".'
                        },
                        {
                            id: 'l-p2-28',
                            questionNumber: 28,
                            audioScript: 'Question: What time is your flight to Paris?\nA. At 6 PM.\nB. It\'s a long flight.\nC. I\'ve never been there.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'What time (mấy giờ) -> "At 6 PM".'
                        },
                        {
                            id: 'l-p2-29',
                            questionNumber: 29,
                            audioScript: 'Question: Isn\'t Mr. Lee coming to the meeting?\nA. He called in sick today.\nB. Yes, the meeting is over.\nC. Room 302.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Câu hỏi phủ định -> Giải thích lý do không đến.'
                        },
                        {
                            id: 'l-p2-30',
                            questionNumber: 30,
                            audioScript: 'Question: How should we celebrate the project completion?\nA. Let\'s go out for dinner.\nB. It took three months.\nC. Congratulations.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Đề xuất cách ăn mừng -> "Let\'s go out for dinner".'
                        },
                        {
                            id: 'l-p2-31',
                            questionNumber: 31,
                            audioScript: 'Question: There is a package for you at the reception.\nA. Thanks, I\'ll pick it up.\nB. I mailed it yesterday.\nC. The receptionist is nice.',
                            options: ['A', 'B', 'C'],
                            correctAnswer: 0,
                            explanation: 'Thông báo có bưu kiện -> Cảm ơn và nói sẽ lấy.'
                        }
                    ]
                },
                {
                    id: 'part3',
                    name: 'Part 3: Conversations',
                    description: 'Directions: You will hear some conversations between two or more people. You will be asked to answer three questions about what the speakers say in each conversation.',
                    questionCount: 39,
                    passages: [
                        // Conversation 1
                        {
                            id: 'l-p3-1',
                            audioScript: `
                                M: Hi, I'd like to book a flight to London for next Tuesday.
                                W: Certainly. Would you like a morning or afternoon departure?
                                M: Morning, please. Around 10 AM if possible.
                                W: I have a flight departing at 10:15 AM. The price is $450.
                            `,
                            questions: [
                                {
                                    id: 'l-p3-1-1',
                                    questionNumber: 32,
                                    question: 'Where is the man going?',
                                    options: ['New York', 'London', 'Paris', 'Tokyo'],
                                    correctAnswer: 1,
                                    explanation: 'Man: "book a flight to London".'
                                },
                                {
                                    id: 'l-p3-1-2',
                                    questionNumber: 33,
                                    question: 'When does he want to leave?',
                                    options: ['Monday morning', 'Tuesday morning', 'Tuesday afternoon', 'Wednesday morning'],
                                    correctAnswer: 1,
                                    explanation: 'Next Tuesday + Morning.'
                                },
                                {
                                    id: 'l-p3-1-3',
                                    questionNumber: 34,
                                    question: 'What is the price of the ticket?',
                                    options: ['$400', '$450', '$500', '$550'],
                                    correctAnswer: 1,
                                    explanation: 'Woman: "The price is $450".'
                                }
                            ]
                        },
                        // Conversation 2
                        {
                            id: 'l-p3-2',
                            audioScript: `
                                W: Mr. Davies, have you finished the quarterly financial report?
                                M: Not yet, Sarah. I'm still waiting for the sales figures from the Tokyo office.
                                W: Oh, I see. The board meeting is tomorrow morning, so we really need it by end of day.
                                M: Don't worry. I'll call them right now to get the data.
                            `,
                            questions: [
                                { id: 'l-p3-2-1', questionNumber: 35, question: 'What are the speakers discussing?', options: ['A marketing plan', 'A financial report', 'A business trip', 'An office party'], correctAnswer: 1, explanation: 'Woman: "quarterly financial report".' },
                                { id: 'l-p3-2-2', questionNumber: 36, question: 'What is the man waiting for?', options: ['Sales figures', 'A flight ticket', 'A signed contract', 'A computer'], correctAnswer: 0, explanation: 'Man: "waiting for the sales figures".' },
                                { id: 'l-p3-2-3', questionNumber: 37, question: 'What will the man do next?', options: ['Go to a meeting', 'Call the Tokyo office', 'Write an email', 'Leave for the day'], correctAnswer: 1, explanation: 'Man: "I\'ll call them right now".' }
                            ]
                        },
                        // Conversation 3
                        {
                            id: 'l-p3-3',
                            audioScript: `
                                M: Excuse me, does this bus go to the City Museum?
                                W: No, this is the Number 10 bus. You need the Number 42.
                                M: Oh, I must have read the schedule wrong. Do you know where I can catch that one?
                                W: Yes, just cross the street and wait at the stop in front of the bank.
                            `,
                            questions: [
                                { id: 'l-p3-3-1', questionNumber: 38, question: 'Where does the man want to go?', options: ['The bank', 'The City Museum', 'The train station', 'The library'], correctAnswer: 1, explanation: 'Man: "go to the City Museum".' },
                                { id: 'l-p3-3-2', questionNumber: 39, question: 'What bus number does the man need?', options: ['10', '24', '42', '50'], correctAnswer: 2, explanation: 'Woman: "You need the Number 42".' },
                                { id: 'l-p3-3-3', questionNumber: 40, question: 'Where should the man wait?', options: ['In front of the bank', 'At the current stop', 'Next to the park', 'Inside the museum'], correctAnswer: 0, explanation: 'Woman: "in front of the bank".' }
                            ]
                        },
                        // Conversation 4
                        {
                            id: 'l-p3-4',
                            audioScript: `
                                W: Hi, I bought this printer here yesterday, but it's not working properly.
                                M: I'm sorry to hear that. What seems to be the problem?
                                W: The paper keeps jamming every time I try to print more than one page.
                                M: I see. Since you bought it just yesterday, we can exchange it for a new one or give you a full refund.
                            `,
                            questions: [
                                { id: 'l-p3-4-1', questionNumber: 41, question: 'Why is the woman at the store?', options: ['To buy a printer', 'To return a defective item', 'To apply for a job', 'To get printer ink'], correctAnswer: 1, explanation: 'Trả lại máy in bị hỏng.' },
                                { id: 'l-p3-4-2', questionNumber: 42, question: 'What is the problem with the printer?', options: ['It won\'t turn on', 'The ink is empty', 'Paper keeps jamming', 'It prints too slowly'], correctAnswer: 2, explanation: 'Woman: "paper keeps jamming".' },
                                { id: 'l-p3-4-3', questionNumber: 43, question: 'What does the man offer?', options: ['A discount', 'A repair service', 'An exchange or refund', 'A user manual'], correctAnswer: 2, explanation: 'Man: "exchange it... or give you a full refund".' }
                            ]
                        },
                        // Conversation 5
                        {
                            id: 'l-p3-5',
                            audioScript: `
                                M: Welcome to Oscar's Catering. How can I help you?
                                W: I'm organizing a retirement party for a colleague next Friday, and I need food for about 30 people.
                                M: We have several menu options. Are you interested in a sit-down dinner or a buffet?
                                W: A buffet would be better. We want people to mingle.
                            `,
                            questions: [
                                { id: 'l-p3-5-1', questionNumber: 44, question: 'What kind of business is the man working for?', options: ['A restaurant', 'A catering service', 'A hotel', 'A travel agency'], correctAnswer: 1, explanation: 'Man: "Oscar\'s Catering".' },
                                { id: 'l-p3-5-2', questionNumber: 45, question: 'What event is the woman planning?', options: ['A wedding', 'A birthday party', 'A retirement party', 'A conference'], correctAnswer: 2, explanation: 'Woman: "retirement party".' },
                                { id: 'l-p3-5-3', questionNumber: 46, question: 'What type of service does the woman choose?', options: ['Sit-down dinner', 'Buffet', 'Take-out', 'Boxed lunches'], correctAnswer: 1, explanation: 'Woman: "A buffet would be better".' }
                            ]
                        },
                        // Conversation 6
                        {
                            id: 'l-p3-6',
                            audioScript: `
                                W: Did you hear that the company is opening a new branch in Singapore?
                                M: Yes, I saw the memo this morning. It's a great opportunity for expansion.
                                W: They are looking for managers to transfer there. Are you interested?
                                M: Actually, I am. I've always wanted to work in Asia. I might apply.
                            `,
                            questions: [
                                { id: 'l-p3-6-1', questionNumber: 47, question: 'What is the company doing?', options: ['Closing a factory', 'Opening a new branch', 'Hiring new interns', 'Launching a product'], correctAnswer: 1, explanation: 'Woman: "opening a new branch".' },
                                { id: 'l-p3-6-2', questionNumber: 48, question: 'Where is the new location?', options: ['London', 'New York', 'Singapore', 'Tokyo'], correctAnswer: 2, explanation: 'Woman: "in Singapore".' },
                                { id: 'l-p3-6-3', questionNumber: 49, question: 'What does the man say he might do?', options: ['Quit his job', 'Visit Singapore for vacation', 'Apply for a transfer', 'Buy company stock'], correctAnswer: 2, explanation: 'Man: "I might apply".' }
                            ]
                        },
                        // Conversation 7
                        {
                            id: 'l-p3-7',
                            audioScript: `
                                M: I'm really impressed with the new software update. It's much faster than the old version.
                                W: I agree. But I'm having trouble finding the "Save As" function. The menu has changed.
                                M: Oh, it's under the "File" tab, but you have to click "More Options" now.
                                W: Thanks! That's a bit confusing. I hope they fix that in the next patch.
                            `,
                            questions: [
                                { id: 'l-p3-7-1', questionNumber: 50, question: 'What do the speakers like about the software update?', options: ['The design', 'The speed', 'The price', 'The new features'], correctAnswer: 1, explanation: 'Man: "It\'s much faster".' },
                                { id: 'l-p3-7-2', questionNumber: 51, question: 'What problem is the woman having?', options: ['Installing the update', 'Finding a function', 'Opening a file', 'Printing a document'], correctAnswer: 1, explanation: 'Woman: "trouble finding the Save As function".' },
                                { id: 'l-p3-7-3', questionNumber: 52, question: 'Where is the function located?', options: ['Under "Edit"', 'Under "Tools"', 'Under "File" > "More Options"', 'On the desktop'], correctAnswer: 2, explanation: 'Man: "under the File tab... click More Options".' }
                            ]
                        },
                        // Conversation 8
                        {
                            id: 'l-p3-8',
                            audioScript: `
                                W: Good morning, City Library. How can I help you?
                                M: Hello, I'm calling to renew a book I borrowed. It's due today, but I won't be able to return it until Saturday.
                                W: I can help you with that. What is the title of the book and your library card number?
                                M: The title is "Modern Economics" and my card number is 45290.
                            `,
                            questions: [
                                { id: 'l-p3-8-1', questionNumber: 53, question: 'Why is the man calling?', options: ['To reserve a book', 'To renew a book', 'To pay a fine', 'To ask for directions'], correctAnswer: 1, explanation: 'Man: "calling to renew a book".' },
                                { id: 'l-p3-8-2', questionNumber: 54, question: 'When will he return the book?', options: ['Today', 'Tomorrow', 'Friday', 'Saturday'], correctAnswer: 3, explanation: 'Man: "until Saturday".' },
                                { id: 'l-p3-8-3', questionNumber: 55, question: 'What information does the woman ask for?', options: ['His name and address', 'Book title and card number', 'Phone number', 'Date of birth'], correctAnswer: 1, explanation: 'Book title and card number.' }
                            ]
                        },
                        // Conversation 9
                        {
                            id: 'l-p3-9',
                            audioScript: `
                                M: Hey, are you going to the company picnic on Saturday?
                                W: I'm not sure. I have a lot of errands to run this weekend.
                                M: You should come! There will be free food and games. Plus, the CEO is giving a speech.
                                W: Well, maybe I can finish my errands on Sunday morning. Okay, I'll go.
                            `,
                            questions: [
                                { id: 'l-p3-9-1', questionNumber: 56, question: 'What event are they discussing?', options: ['A meeting', 'A picnic', 'A workshop', 'A farewell party'], correctAnswer: 1, explanation: 'Man: "company picnic".' },
                                { id: 'l-p3-9-2', questionNumber: 57, question: 'Why was the woman hesitant?', options: ['She hates picnics', 'She has errands', 'She is sick', 'She has to work'], correctAnswer: 1, explanation: 'Woman: "have a lot of errands".' },
                                { id: 'l-p3-9-3', questionNumber: 58, question: 'What convinced her to go?', options: ['The free food', 'The games', 'The CEO\'s speech', 'She can do errands on Sunday'], correctAnswer: 3, explanation: 'She realized she can do errands on Sunday. "finish my errands on Sunday... Okay, I\'ll go".' }
                            ]
                        },
                        // Conversation 10
                        {
                            id: 'l-p3-10',
                            audioScript: `
                                W: My car won't start. I think the battery is dead.
                                M: That's unfortunate. Do you have jumper cables? I can help you jump-start it.
                                W: No, I don't have any. I'll have to call a tow truck.
                                M: Wait, I have a portable jump starter in my trunk. Let me get it.
                            `,
                            questions: [
                                { id: 'l-p3-10-1', questionNumber: 59, question: 'What is the woman\'s problem?', options: ['Flat tire', 'Out of gas', 'Dead battery', 'Lost keys'], correctAnswer: 2, explanation: 'Woman: "battery is dead".' },
                                { id: 'l-p3-10-2', questionNumber: 60, question: 'What does the woman initially plan to do?', options: ['Call a taxi', 'Call a tow truck', 'Walk home', 'Buy a new battery'], correctAnswer: 1, explanation: 'Woman: "call a tow truck".' },
                                { id: 'l-p3-10-3', questionNumber: 61, question: 'How does the man help?', options: ['He calls a mechanic', 'He gives her a ride', 'He uses a portable jump starter', 'He pushes the car'], correctAnswer: 2, explanation: 'Man: "I have a portable jump starter".' }
                            ]
                        },
                        // Conversation 11
                        {
                            id: 'l-p3-11',
                            audioScript: `
                                M: Did you see the memo about the new dress code?
                                W: No, I haven't checked my email yet. What does it say?
                                M: Starting next month, we can wear casual clothes on Fridays.
                                W: That's great news! I can finally wear my jeans.
                            `,
                            questions: [
                                { id: 'l-p3-11-1', questionNumber: 62, question: 'What is the topic of conversation?', options: ['Salary increase', 'New dress code', 'Holiday schedule', 'Office renovation'], correctAnswer: 1, explanation: 'New dress code.' },
                                { id: 'l-p3-11-2', questionNumber: 63, question: 'When does the change take effect?', options: ['Today', 'Tomorrow', 'Next week', 'Next month'], correctAnswer: 3, explanation: 'Man: "Starting next month".' },
                                { id: 'l-p3-11-3', questionNumber: 64, question: 'What is allowed on Fridays?', options: ['Leaving early', 'Free lunch', 'Casual clothes', 'Working from home'], correctAnswer: 2, explanation: 'Man: "casual clothes on Fridays".' }
                            ]
                        },
                        // Conversation 12
                        {
                            id: 'l-p3-12',
                            audioScript: `
                                W: I need to order more office supplies. We are out of paper and ink.
                                M: Make sure to check the supply closet first. I think I saw some boxes of paper on the top shelf.
                                W: I did check, but those boxes are empty. Someone forgot to throw them away.
                                M: Okay, then go ahead and place the order. Don't forget to order some pens too.
                            `,
                            questions: [
                                { id: 'l-p3-12-1', questionNumber: 65, question: 'What does the woman need to do?', options: ['Clean the office', 'Order supplies', 'Write a report', 'Fix the printer'], correctAnswer: 1, explanation: 'Woman: "order more office supplies".' },
                                { id: 'l-p3-12-2', questionNumber: 66, question: 'What did the man think he saw?', options: ['Ink cartridges', 'Pens', 'Boxes of paper', 'A new printer'], correctAnswer: 2, explanation: 'Man: "saw some boxes of paper".' },
                                { id: 'l-p3-12-3', questionNumber: 67, question: 'What else needs to be ordered?', options: ['Staplers', 'Pens', 'Folders', 'Notebooks'], correctAnswer: 1, explanation: 'Man: "order some pens too".' }
                            ]
                        },
                        // Conversation 13
                        {
                            id: 'l-p3-13',
                            audioScript: `
                                M: The elevator is broken again. We have to take the stairs.
                                W: But our office is on the 10th floor! I can't climb that many stairs.
                                M: I know, it's annoying. But the maintenance crew said it won't be fixed until this afternoon.
                                W: I guess I'll grab a coffee and work in the lobby until then.
                            `,
                            questions: [
                                { id: 'l-p3-13-1', questionNumber: 68, question: 'What is the problem?', options: ['Power outage', 'Elevator is broken', 'Fire alarm', 'Stairs are blocked'], correctAnswer: 1, explanation: 'Man: "elevator is broken".' },
                                { id: 'l-p3-13-2', questionNumber: 69, question: 'Which floor is their office on?', options: ['5th', '8th', '10th', '12th'], correctAnswer: 2, explanation: 'Woman: "on the 10th floor".' },
                                { id: 'l-p3-13-3', questionNumber: 70, question: 'What does the woman decide to do?', options: ['Climb the stairs', 'Go home', 'Work in the lobby', 'Call maintenance'], correctAnswer: 2, explanation: 'Woman: "work in the lobby".' }
                            ]
                        }
                    ]
                },
                {
                    id: 'part4',
                    name: 'Part 4: Talks',
                    description: 'Directions: You will hear some talks given by a single speaker. You will be asked to answer three questions about what the speaker says in each talk.',
                    questionCount: 30,
                    passages: [
                        // Talk 1
                        {
                            id: 'l-p4-1',
                            audioScript: `
                                Attention passengers. Flight 492 to Chicago has been delayed due to severe weather conditions. 
                                The new departure time is 4:30 PM. We apologize for the inconvenience and will provide meal vouchers 
                                to all passengers. Please come to the service desk to collect your voucher.
                            `,
                            questions: [
                                { id: 'l-p4-1-1', questionNumber: 71, question: 'Where is this announcement taking place?', options: ['At a train station', 'At an airport', 'On a bus', 'At a hotel'], correctAnswer: 1, explanation: 'Flight announcement -> Airport.' },
                                { id: 'l-p4-1-2', questionNumber: 72, question: 'Why is the flight delayed?', options: ['Technical problem', 'Late crew', 'Severe weather', 'Strikes'], correctAnswer: 2, explanation: 'Due to severe weather.' },
                                { id: 'l-p4-1-3', questionNumber: 73, question: 'What is offered to passengers?', options: ['Hotel rooms', 'Meal vouchers', 'Refunds', 'Free tickets'], correctAnswer: 1, explanation: 'Meal vouchers.' }
                            ]
                        },
                        // Talk 2
                        {
                            id: 'l-p4-2',
                            audioScript: `
                                Good morning, staff. I have an important announcement. Our company has been acquired by Global Tech Industries.
                                This merger will bring many exciting opportunities. However, there will be some restructuring of departments.
                                Detailed information will be sent to your email later today. A town hall meeting will be held on Friday to answer questions.
                            `,
                            questions: [
                                { id: 'l-p4-2-1', questionNumber: 74, question: 'What is the main topic of the announcement?', options: ['A new product', 'A company merger', 'A holiday party', 'A new CEO'], correctAnswer: 1, explanation: 'Company acquired by Global Tech (Merger).' },
                                { id: 'l-p4-2-2', questionNumber: 75, question: 'What will happen to departments?', options: ['They will be expanded', 'They will be closed', 'They will be restructured', 'Nothing changes'], correctAnswer: 2, explanation: 'Some restructuring of departments.' },
                                { id: 'l-p4-2-3', questionNumber: 76, question: 'When is the town hall meeting?', options: ['Today', 'Tomorrow', 'Friday', 'Next week'], correctAnswer: 2, explanation: 'Meeting on Friday.' }
                            ]
                        },
                        // Talk 3
                        {
                            id: 'l-p4-3',
                            audioScript: `
                                Welcome to the City Art Museum audio guide. You are currently standing in the Impressionist Gallery.
                                On your left, you will see "Water Lilies" by Claude Monet. This masterpiece was painted in 1916.
                                Please notice the use of light and color. Feel free to pause this audio guide to admire the painting.
                            `,
                            questions: [
                                { id: 'l-p4-3-1', questionNumber: 77, question: 'Where are the listeners?', options: ['In a library', 'In a museum', 'In a park', 'In a school'], correctAnswer: 1, explanation: 'City Art Museum.' },
                                { id: 'l-p4-3-2', questionNumber: 78, question: 'Who painted "Water Lilies"?', options: ['Van Gogh', 'Da Vinci', 'Claude Monet', 'Picasso'], correctAnswer: 2, explanation: 'By Claude Monet.' },
                                { id: 'l-p4-3-3', questionNumber: 79, question: 'What does the speaker suggest?', options: ['Taking a photo', 'Touching the painting', 'Pausing the audio', 'Moving to the next room'], correctAnswer: 2, explanation: 'Pause this audio guide.' }
                            ]
                        },
                        // Talk 4
                        {
                            id: 'l-p4-4',
                            audioScript: `
                                This is a traffic update for the metropolitan area. There is a major accident on Highway 95 North near Exit 10.
                                Two lanes are blocked, causing significant delays. Drivers are advised to take Route 1 as an alternative.
                                The accident is expected to be cleared in about an hour. Drive safely.
                            `,
                            questions: [
                                { id: 'l-p4-4-1', questionNumber: 80, question: 'What is the report about?', options: ['Weather', 'Sports', 'Traffic', 'Business'], correctAnswer: 2, explanation: 'Traffic update.' },
                                { id: 'l-p4-4-2', questionNumber: 81, question: 'Where is the accident?', options: ['Highway 95', 'Route 1', 'Main Street', 'Exit 5'], correctAnswer: 0, explanation: 'On Highway 95 North.' },
                                { id: 'l-p4-4-3', questionNumber: 82, question: 'What advice is given to drivers?', options: ['Stop driving', 'Take Route 1', 'Go home', 'Drive faster'], correctAnswer: 1, explanation: 'Take Route 1 as an alternative.' }
                            ]
                        },
                        // Talk 5
                        {
                            id: 'l-p4-5',
                            audioScript: `
                                Thank you for calling Tech Support. All our agents are currently busy assisting other customers.
                                Your estimated wait time is 5 minutes. If you would like to leave a voicemail, please press 1.
                                For frequently asked questions, please visit our website at www.techhelp.com.
                            `,
                            questions: [
                                { id: 'l-p4-5-1', questionNumber: 83, question: 'Who is the caller trying to reach?', options: ['Sales', 'HR', 'Tech Support', 'Accounting'], correctAnswer: 2, explanation: 'Calling Tech Support.' },
                                { id: 'l-p4-5-2', questionNumber: 84, question: 'What is the estimated wait time?', options: ['2 minutes', '5 minutes', '10 minutes', '30 minutes'], correctAnswer: 1, explanation: 'Wait time is 5 minutes.' },
                                { id: 'l-p4-5-3', questionNumber: 85, question: 'What can the caller do by pressing 1?', options: ['Speak to an agent', 'Leave a voicemail', 'Visit the website', 'Hang up'], correctAnswer: 1, explanation: 'Leave a voicemail.' }
                            ]
                        },
                        // Talk 6
                        {
                            id: 'l-p4-6',
                            audioScript: `
                                Do you want to learn how to cook like a pro? Join our weekend cooking classes at the Culinary Institute.
                                Our expert chefs will teach you how to prepare delicious Italian meals.
                                Classes start next Saturday. Register now and get a 20% discount. Call 555-0199 today.
                            `,
                            questions: [
                                { id: 'l-p4-6-1', questionNumber: 86, question: 'What is being advertised?', options: ['A restaurant', 'Cooking classes', 'A cookbook', 'Kitchen equipment'], correctAnswer: 1, explanation: 'Weekend cooking classes.' },
                                { id: 'l-p4-6-2', questionNumber: 87, question: 'What type of food will be taught?', options: ['French', 'Chinese', 'Italian', 'Mexican'], correctAnswer: 2, explanation: 'Italian meals.' },
                                { id: 'l-p4-6-3', questionNumber: 88, question: 'What is offered for early registration?', options: ['Free apron', 'A discount', 'Free cookbook', 'Private lesson'], correctAnswer: 1, explanation: 'Get a 20% discount.' }
                            ]
                        },
                        // Talk 7
                        {
                            id: 'l-p4-7',
                            audioScript: `
                                Hello everyone, I'm your tour guide for today's hike. We will be hiking the Sunset Trail, which is about 3 miles long.
                                Please make sure you have enough water and wear comfortable shoes. The weather is sunny, so satisfy wear sunscreen.
                                We will take a break at the waterfall halfway through.
                            `,
                            questions: [
                                { id: 'l-p4-7-1', questionNumber: 89, question: 'What activity are they doing?', options: ['Swimming', 'Cycling', 'Hiking', 'Running'], correctAnswer: 2, explanation: 'Hiking the Sunset Trail.' },
                                { id: 'l-p4-7-2', questionNumber: 90, question: 'What does the guide remind them to bring?', options: ['Map', 'Water', 'Camera', 'Food'], correctAnswer: 1, explanation: 'Have enough water.' },
                                { id: 'l-p4-7-3', questionNumber: 91, question: 'Where will they take a break?', options: ['At the peak', 'At the parking lot', 'At the waterfall', 'At the lodge'], correctAnswer: 2, explanation: 'At the waterfall.' }
                            ]
                        },
                        // Talk 8
                        {
                            id: 'l-p4-8',
                            audioScript: `
                                We are pleased to present the Employee of the Month award to John Stevens.
                                John has demonstrated exceptional leadership in the marketing department.
                                His recent campaign increased our sales by 15%. Let's give him a round of applause.
                            `,
                            questions: [
                                { id: 'l-p4-8-1', questionNumber: 92, question: 'What is the occasion?', options: ['A retirement party', 'An award presentation', 'A birthday', 'A job interview'], correctAnswer: 1, explanation: 'Present the Employee of the Month award.' },
                                { id: 'l-p4-8-2', questionNumber: 93, question: 'Which department does John work in?', options: ['Sales', 'Marketing', 'Finance', 'IT'], correctAnswer: 1, explanation: 'Marketing department.' },
                                { id: 'l-p4-8-3', questionNumber: 94, question: 'Why is he receiving the award?', options: ['Perfect attendance', 'Increased sales', 'Years of service', 'Helping a colleague'], correctAnswer: 1, explanation: 'Campaign increased sales by 15%.' }
                            ]
                        },
                        // Talk 9
                        {
                            id: 'l-p4-9',
                            audioScript: `
                                To all tenants of the Oakwood Apartments. The water will be shut off for maintenance tomorrow between 9 AM and 12 PM.
                                This is to repair a leak in the main pipe. Please store some water for your needs.
                                We apologize for the inconvenience and thank you for your cooperation.
                            `,
                            questions: [
                                { id: 'l-p4-9-1', questionNumber: 95, question: 'Who is the announcement for?', options: ['Office workers', 'Apartment tenants', 'Hotel guests', 'Store customers'], correctAnswer: 1, explanation: 'Tenants of Oakwood Apartments.' },
                                { id: 'l-p4-9-2', questionNumber: 96, question: 'What will happen tomorrow?', options: ['Power outage', 'Water shut off', 'Fire drill', 'Elevator repair'], correctAnswer: 1, explanation: 'Water will be shut off.' },
                                { id: 'l-p4-9-3', questionNumber: 97, question: 'How long will the maintenance last?', options: ['1 hour', '2 hours', '3 hours', 'All day'], correctAnswer: 2, explanation: '9 AM to 12 PM = 3 hours.' }
                            ]
                        },
                        // Talk 10
                        {
                            id: 'l-p4-10',
                            audioScript: `
                                At Green Earth Gardening, we help you create the garden of your dreams.
                                We offer landscape design, lawn care, and tree planting services.
                                This week only, buy any two plants and get the third one free. Visit us on Main Street.
                            `,
                            questions: [
                                { id: 'l-p4-10-1', questionNumber: 98, question: 'What kind of business is this?', options: ['A flower shop', 'A landscaping service', 'A hardware store', 'A grocery store'], correctAnswer: 1, explanation: 'Gardening / Landscape design.' },
                                { id: 'l-p4-10-2', questionNumber: 99, question: 'What is the special offer?', options: ['Free delivery', '50% off', 'Buy 2 get 1 free', 'Free consultation'], correctAnswer: 2, explanation: 'Buy any two plants and get the third one free.' },
                                { id: 'l-p4-10-3', questionNumber: 100, question: 'Where is the business located?', options: ['First Avenue', 'Main Street', 'Broadway', 'Park Lane'], correctAnswer: 1, explanation: 'On Main Street.' }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
