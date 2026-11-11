from html2image import Html2Image

hti = Html2Image()

# 将 HTML 转为图片
# size: (宽, 高) 单位px
hti.screenshot(
    url="file:///D:/详情页/index.html",
    save_as="detail_page.png",
    size=(1400, 8000)
)

print("转换完成：detail_page.png")
