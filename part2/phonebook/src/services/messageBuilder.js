export const createErrorMessage = (message) => ({
    content: message,
    type: "error"
})

export const createSuccessMessage = (message) => ({
    content: message,
    type: "success"
})