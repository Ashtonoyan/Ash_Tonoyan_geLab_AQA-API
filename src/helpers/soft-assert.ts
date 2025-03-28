export class SoftAssert {
    private errors: string[] = [];

    public assert(condition: boolean, message: string) {
        if (!condition) {
            this.errors.push(message);
        }
    }

    public check() {
        if (this.errors.length > 0) {
            throw new Error(`Soft assertion errors:\n${this.errors.join('\n')}`);
        }
    }
}