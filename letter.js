export default async function handler(req, res) {
  // 设置CORS头，允许前端调用
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 仅允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只支持GET请求' });
  }

  try {
    const { text } = req.query;
    
    // 检查参数
    if (!text) {
      return res.status(400).json({ error: '缺少text参数' });
    }

    // 解码文本并处理换行
    const decodedText = decodeURIComponent(text);
    const formattedText = decodedText.replace(/\n/g, '<br>');

    // 创建复古信纸风格的HTML
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
        <div class="letter-content">${formattedText}</div>
    </div>
</body>
</html>
    `;

    // 返回HTML响应
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(htmlContent);
    
  } catch (error) {
    res.status(500).json({ error: '服务器错误: ' + error.message });
  }
}
