const validation = (obj, val) => {
    switch (obj) {
        case 'name':
            if (val.length < 3) {
                return { valid: false, text: <p>Name should have at least 3 characters</p> }
            } else {
                return { valid: true, text: null };
            }
        case "type":
            if (val.length < 3) {
                return { valid: false, text: <p>Type should have at least 3 characters</p> }
            } else {
                return { valid: true, text: null };
            }
        case "description":
            if (val.length < 3) {
                return { valid: false, text: <p>Type should have at least 3 characters</p> }
            } else {
                return { valid: true, text: null };
            }
        default:
            return null;
    }
}

export default validation;