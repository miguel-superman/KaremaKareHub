export function validateAccount(data) {

    if (!data.email) {

        return "Email address is required.";

    }


    if (!data.password) {

        return "Password is required.";

    }


    if (data.password.length < 6) {

        return "Password must be at least 6 characters.";

    }


    if (data.password !== data.confirm) {

        return "Passwords do not match.";

    }


    return null;

}





export function validatePersonal(data) {


    const required = [

        "firstName",
        "lastName",
        "phone",
        "city",
        "parish"

    ];



    for (const field of required) {


        if (!data[field]) {

            return `${field} is required.`;

        }

    }


    return null;

}






export function validateProfessional(data) {


    if (!data.profession) {

        return "Please select your profession.";

    }



    if (!data.licenseNumber) {

        return "Professional license number is required.";

    }



    if (!data.experience) {

        return "Please select your experience.";

    }



    return null;

}







export function validateRates(data) {


    if (!data.hourlyRate) {

        return "Hourly rate is required.";

    }



    if (Number(data.hourlyRate) <= 0) {

        return "Hourly rate must be greater than zero.";

    }



    return null;

}







export function validateDocuments(data) {


    // if (!data.profilePhoto) {

    //     return "Profile photo is required.";

    // }



    if (!data.governmentId) {

        return "Government ID is required.";

    }



    // if (!data.professionalLicense) {

    //     return "Professional license is required.";

    // }



    return null;

}