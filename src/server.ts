import app from "./app";
import "dotenv";

const PORT = process.env.PORT || 3000;

app.listen(3001, () => console.log(`Server running on port ${PORT}`));
