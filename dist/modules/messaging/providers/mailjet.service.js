"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailjetService = void 0;
const common_1 = require("@nestjs/common");
const node_mailjet_1 = require("node-mailjet");
class MailjetService {
    constructor() {
        this.logger = new common_1.Logger(MailjetService.name);
        this.client = new node_mailjet_1.Client({
            apiKey: process.env.MAILJET_API_KEY,
            apiSecret: process.env.MAILJET_SECRET_KEY,
            config: {
                version: 'v3.1',
            },
        });
    }
    async send(input) {
        const { from, to, subject, body } = input;
        await this.client
            .post('send')
            .request({
            Messages: [
                {
                    From: {
                        Email: from,
                    },
                    To: [
                        {
                            Email: to,
                        },
                    ],
                    Subject: subject,
                    HTMLPart: body,
                },
            ],
        })
            .then(() => {
            this.logger.debug(`Email sent to ${to}`);
        })
            .catch((err) => {
            this.logger.error('Error sending email', err.stack);
        });
    }
}
exports.MailjetService = MailjetService;
//# sourceMappingURL=mailjet.service.js.map