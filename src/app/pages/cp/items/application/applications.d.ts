interface AccessControl {
    viewPath: string,
    editPath: string,
    viewRoles: string,
    editRoles: string
}

interface ApplicationData {
    accessControl: AccessControl,
    application: any,
    collections?: any[]
}