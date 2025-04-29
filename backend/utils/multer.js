// import multer from "multer";

// const upload = multer({dest:"uploads/"});
// export default upload

import multer from "multer";

// store files in memory instead of "uploads/" folder
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
