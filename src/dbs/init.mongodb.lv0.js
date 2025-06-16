'use strict';
/**'
 * Không hỗ trợ Singleton:
    Mỗi lần file này được gọi, một kết nối mới có thể được tạo ra, gây lãng phí tài nguyên.
*Khó mở rộng:
    Không có lớp quản lý kết nối, khó thêm các tính năng như retry logic hoặc quản lý trạng thái kết nối.
*Không đảm bảo tính nhất quán:
    Nếu dự án lớn, việc quản lý nhiều kết nối sẽ trở nên phức tạp.
 */

const mongoose = require('mongoose');

const connectString = `mongodb://localhost:27017/shopDEV`;

mongoose
  .connect(connectString)
  .then((_) => console.log(`connected mongodb success`))
  .catch((err) => console.log(`Error connect!`));

// dev
if (1 === 1) {
  mongoose.set('debug',true);
  mongoose.set('debug', { color: true });
}

module.exports = mongoose;
