import ErrsMsgs from './messages/errors.msg.json' assert { type: "json" };

const Verdicts = {
    'CAN_T_READ': {
        status: 500,
        type: 'json',
        outcome: { "error": "Could not read from file" }
    },
    'CAN_T_RESET': {
        status: 500,
        type: 'json',
        outcome: { "error": "Could not reset" }
    },
    'CAN_T_SAVE': {
        status: 500,
        type: 'json',
        outcome: { "error": "Could not save to file" }
    },
    'CLASS__INIT': {
        status: 500,
        type: 'json',
        outcome: { "error": "Could not initialize the class" }
    },
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
