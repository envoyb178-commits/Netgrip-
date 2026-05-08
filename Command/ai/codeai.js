module.exports = {
  name: 'codeai',
  description: 'AI Programming Tutor',
  aliases: ['coding', 'learn', 'programming', 'teach'],
  cooldown: 3,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃💻 *CODE AI TUTOR*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .codeai [language] [topic]
┃
┃📝 *Examples:*
┃• .codeai javascript loops
┃• .codeai python functions
┃• .codeai html css flexbox
┃• .codeai react usestate
┃
┃📚 *Available Topics:*
┃• Web Development (HTML/CSS/JS)
┃• Backend (Python, Node.js, PHP)
┃• Databases (SQL, MongoDB)
┃• Frameworks (React, Vue, Django)
┃• Algorithms & Data Structures
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const query = args.join(' ').toLowerCase();
    
    const tutorials = {
      javascript: `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃💻 *JAVASCRIPT TUTORIAL*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📚 *Topic: ${query}*
┃
┃💻 *Code Example:*
┃\`\`\`javascript
┃// ${query}
┃function example() {
┃  console.log("Learning ${query}");
┃  return "Success!";
┃}
┃
┃// Call the function
┃example();
┃\`\`\`
┃
┃📖 *Explanation:*
┃JavaScript is a versatile programming language
┃used for web development, servers, and more.
┃
┃🎯 *Practice Task:*
┃Modify the code above to accept parameters!
┃
┃💡 *Pro Tip:* Use console.log() to debug
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`,
      
      python: `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🐍 *PYTHON TUTORIAL*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📚 *Topic: ${query}*
┃
┃💻 *Code Example:*
┃\`\`\`python
┃# ${query}
┃def learn_python():
┃    print("Learning ${query}")
┃    return "Great progress!"
┃
┃# Execute
┃result = learn_python()
┃print(result)
┃\`\`\`
┃
┃📖 *Explanation:*
┃Python has clean, readable syntax perfect for beginners.
┃
┃🎯 *Try This:*
┃Create a function with parameters!
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`,
      
      html: `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🌐 *HTML/CSS TUTORIAL*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📚 *Topic: ${query}*
┃
┃💻 *Code Example:*
┃\`\`\`html
┃<!DOCTYPE html>
┃<html>
┃<head>
┃  <style>
┃    .container {
┃      display: flex;
┃      justify-content: center;
┃    }
┃  </style>
┃</head>
┃<body>
┃  <div class="container">
┃    <h1>Learning ${query}</h1>
┃  </div>
┃</body>
┃</html>
┃\`\`\`
┃
┃📖 *Explanation:*
┃HTML structures content, CSS styles it beautifully.
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`,
      
      default: `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃💻 *CODING TUTORIAL*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📚 *Learning: ${query.substring(0, 50)}*
┃
┃📖 *Step-by-Step Guide:*
┃
┃1️⃣ *Understand the Concept*
┃   • Research the topic online
┃   • Watch video tutorials
┃   • Read documentation
┃
┃2️⃣ *Practice with Examples*
┃   • Start with basic code
┃   • Modify existing examples
┃   • Build small projects
┃
┃3️⃣ *Debug and Improve*
┃   • Test your code thoroughly
┃   • Fix errors systematically
┃   • Optimize for performance
┃
┃4️⃣ *Share and Get Feedback*
┃   • Join coding communities
┃   • Ask questions on Stack Overflow
┃   • Contribute to open source
┃
┃💡 *Pro Tips:*
┃• Write comments in your code
┃• Use meaningful variable names
┃• Break complex problems into smaller parts
┃• Practice daily for 30 minutes
┃
┃🎯 *Your Task:*
┃Write a simple program about ${query.split(' ')[0] || 'coding'}
┃
┃📚 *Recommended Resources:*
┃• freeCodeCamp (free)
┃• The Odin Project (free)
┃• MDN Web Docs (free)
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`
    };
    
    let response = tutorials.default;
    if (query.includes('javascript') || query.includes('js')) response = tutorials.javascript;
    if (query.includes('python')) response = tutorials.python;
    if (query.includes('html') || query.includes('css')) response = tutorials.html;
    
    await sock.sendMessage(from, { text: response });
  }
};