import ErrsMsgs from './messages/errors.msg.json' assert { type: "json" };

const Verdicts = {
    'SEARCH__NOT_FOUND': {
        status: 404,
        type: 'json',
        outcome: { "error": "Product not found" }
    },
    'NO_DATA': {
        status: 412,
        type: 'json',
        outcome: { "error": "Empty Products List" }
    }
};

export default Verdicts;
