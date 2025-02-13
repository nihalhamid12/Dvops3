class Course {
    constructor(name, code) {
        this.name = name;
        this.code = code;
        
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}
module.exports = { Course };