导出默认异步函数处理程序(req，res) {
//设置CORS标头
RES . set header(设置 接近，' * ')；
RES . set header(设置 接近，得到 选择)；
RES . set header(设置 接近，内容 类型)；

如果 (req.method === '请求) {
返回资源状态(200)。end()；
  }

如果 (req.method！== '请求) {
返回结果状态(405)。json({错误:“不允许方法”})；
  }

尝试{
常数 { 文本 } = 请求.询问
    
    如果(！文本){
    返回资源状态(400)。json({错误:“缺少文本参数”})；
    }

    // Decode text
    常数 解码文本 = decodeURIComponent组件(文本);
    
    // Create HTML content
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
