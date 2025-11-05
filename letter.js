export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { text } = req.query;
    
    if (!text) {
      return res.status(400).json({ error: 'Missing text parameter' });
    }

    // 解码文本
    const decodedText = decodeURIComponent(text);
    
    // 创建HTML内容
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');
        
        body {
            margin: 0;
            padding: 80px 60px;
            background-image: url('https://pixelarray-picturebed.oss-cn-beijing.aliyuncs.com/picturebed/152/e6b84e973e0d054f14fca4b760742d93.jpg');
            background-size: cover;
            font-family: 'Ma Shan Zheng', cursive;
            font-size: 24px;
            line-height: 1.8;
            color: #5c4b3f;
            min-height: 100vh;
        }
        
        .letter-container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 5px;
            backdrop-filter: blur(2px);
        }
        
        .letter-content {
            white-space: pre-wrap;
            word-break: break-word;
        }
    </style>
</head>
<body>
    <div class="letter-container">
        <div class="letter-content">${decodedText.replace(/\n/g, '<br>')}</div>
    </div>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(htmlContent);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server Error: ' + error.message });
  }
}
