import mongoose from "mongoose";

// properties that are required to create new ticket
interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

// properties Ticket Documents has
interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

// properties that a Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs:  TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON : {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);


export { Ticket };