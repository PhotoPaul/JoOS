import { Injectable } from '@angular/core';

import { AjaxService } from '../services/ajax.service';

@Injectable()
export class LocalizationService {
    deleteme = 'α|β|γ|δ|ε|ζ|η|θ|ι|κ|λ|μ|ν|ξ|ο|π|ρ|σ|τ|υ|φ|χ|ψ|ω';

    dictionary = {
        grbc: { gr: 'Ελληνικό Βιβλικό Κολέγιο', en: 'Greek Bible College' },
        applicantIdentityInformation: { gr: 'Στοιχεία Ταυτότητας Υποψηφίου', en: 'Applicant Identity Information' },
        referenceIdentityInformation: { gr: 'Στοιχεία Ταυτότητας Συντάκτη', en: 'Reference Identity Information' },
        regardingTheApplicant: { gr: 'Σχετικά με τον/την Υποψήφιο/α', en: 'Regarding the Applicant' },
        occupation: { gr: 'Επάγγελμα / Ιδιότητα', en: 'Occupation / Role' },
        address: { gr: 'Οδός, αριθμός', en: 'Address' },
        cityZipCountry: { gr: 'Πόλη, Τ.Κ., Χώρα', en: 'City, State / Province, ZIP / Postcode, Country' },
        phone: { gr: 'Τηλέφωνο', en: 'Phone' },
        letterOfRecommendationThankYou1: { gr: 'Ευχαριστούμε!', en: 'Thank you!' },
        letterOfRecommendationThankYou2: {
            gr: 'Η συστατική σας επιστολή έχει αποθηκευτεί και θα ληφθεί σοβαρά υπόψιν.',
            en: 'Your recommendation has been submitted and it will be taken into serious consideration.'
        },
        deleteConfidentialLetterOfRecommendation: {
            gr: 'Διαγραφή Εμπιστευτικής Συστατικής Επιστολής',
            en: 'Delete Confidential Letter of Recommendation'
        },
        uniqueConfidentialLetterOfRecommendationLink: {
            gr: 'Μοναδικός σύνδεσμος Συστατικής Επιστολής',
            en: 'Unique Confidential Letter Of Recommendation Link'
        },
        // login
        login: { gr: 'Είσοδος', en: 'Login' },
        password: { gr: 'Κωδικός', en: 'Password' },
        forgotPassword: { gr: 'Ξέχασα τον κωδικό μου', en: 'I forgot my password' },
        emailNotFound: { gr: 'Η διεύθυση Email δεν βρέθηκε!', en: 'The Email address was not found!' },
        noAccount: { gr: 'Δεν έχω λογαριασμό', en: 'I don\'t have an account' },
        loginFailedWrongEmail: {
            gr: 'Η είσοδος απέτυχε! Για να συνεχίσετε βεβαιωθείτε ότι η <b>διεύθυνση Email</b> που πληκτρολογήσατε είναι η σωστή.',
            en: 'Login failed! To continue please make sure that the <b>Email address</b> you typed is correct.'
        },
        loginFailedWrongPassword: {
            gr: 'Η είσοδος απέτυχε! Για να συνεχίσετε βεβαιωθείτε ότι ο <b>Κωδικός</b> που πληκτρολογήσατε είναι ο σωστός.',
            en: 'Login failed! To continue please make sure that the <b>Password</b> you typed is correct.'
        },

        // reset
        resetPassword: { gr: 'Αλλαγή Κωδικού Πρόσβασης', en: 'Reset Password' },
        resetPasswordAuthCheck: {
            gr: 'Έλεγχος άδειας αλλαγής Κωδικού Πρόσβασης',
            en: 'Checking authorization to reset your Password'
        },
        pleaseWait: { gr: 'Παρακαλώ περιμένετε', en: 'Please Wait' },
        send: { gr: 'Αποστολή Email', en: 'Send Email' },
        soonYouWillReceive1: {
            gr: 'Σύντομα θα λάβετε email στη διεύθυνση',
            en: 'Soon you will receive an email at'
        },
        soonYouWillReceive2: {
            gr: 'με τον προσωπικό σας σύνδεσμο Αλλαγής Κωδικού Πρόσβασης.',
            en: 'with your personal Password Reset link.'
        },
        rememberedPassword: { gr: 'Θυμήθηκα τον κωδικό μου', en: 'I remembered my password' },
        newPassword: { gr: 'Νέος Κωδικός', en: 'New Password' },
        confirmNewPassword: { gr: 'Επιβεβαίωση Νέου Κωδικού', en: 'Confirm New Password' },
        pleaseMakeSure: {
            gr: 'Παρακαλούμε βεβαιωθείτε πως ο Νέος Κωδικός που πληκτρολογήσατε είναι ο ίδιος και στα δύο πεδία.',
            en: 'Please make sure that the New Password you typed is the same in both fields.'
        },
        change: { gr: 'Αλλαγή', en: 'Change' },

        // register
        applicantRegistration: { gr: 'Εγγραφή Υποψηφίου', en: 'Create an Applicant Account' },
        registrationInstructions: {
            gr: 'Για να ξεκινήσετε την διαδικασία εγγραφής,<br>παρακαλούμε συμπληρώστε τα στοιχεία σας.',
            en: 'To begin the registration process,<br>please fill out your information'
        },
        firstName: { gr: 'Όνομα', en: 'First Name' },
        lastName: { gr: 'Επίθετο', en: 'Last Name' },
        recaptchaLanguage: { gr: 'el', en: 'en' },
        register: { gr: 'Εγγραφή', en: 'Register' },
        thankYou1: { gr: 'Ευχαριστούμε!', en: 'Thank you!' },
        thankYou2: { gr: 'Σύντομα θα λάβετε email στη διεύθυνση', en: 'Soon you will receive an email at' },
        thankYou3: { gr: 'με τον προσωπικό σας σύνδεσμο Αίτησης Εγγραφής.', en: 'with your personal Application Link' },
        thankYou4: {
            gr: 'Εάν διαπιστώσατε κάποιο ορθογραφικό λάθος, παρακαλούμε <a href="javascript:" onclick="location.reload(true);">ανανεώστε τη σελίδα</a> και συμπληρώστε σωστά την email διεύθυνσή σας.',
            en: 'If you made a spelling mistake, please <a href="javascript:" onclick="location.reload(true);">refresh this page</a> and type your correct email address.'
        },
        thankYou5: {
            gr: 'Σε περίπτωση που δεν λάβετε το email στα επόμενα 5 λεπτά, επικοινωνήστε με την <a href="https://www.grbc.gr/contact/">γραμματεία του Κολεγίου</a>.',
            en: 'In the case that you will not receive the activation email in the next 5 minutes, please contact the <a href="https://www.grbc.gr/en/contact/">college secretary</a>.'
        },
        registrationProblem1: {
            gr: 'Δυστυχώς υπήρξε κάποιο πρόβλημα με την εγγραφή σας.',
            en: 'Unfortunately there was some problem with your registration.'
        },
        registrationProblem2: {
            gr: 'Υπάρχει ήδη λογαριασμός για την διεύθυνση',
            en: 'There is already an account using the email'
        },
        registrationProblem3: {
            gr: 'Εάν δεν γνωρίζετε ή ξεχάσατε τον Κωδικό Πρόσβασης, μπορείτε να τον αλλάξετε από τη',
            en: 'If you don\'t know or if you have forgotten your Password, you can reset it from the'
        },
        registrationProblem4: {
            gr: 'σελίδα Αλλαγής Κωδικού Πρόσβασης.',
            en: 'Reset Password page.'
        },
        registrationProblem5: {
            gr: 'Εάν δυσκολεύεστε να συνεχίσετε την διαδικασία, παρακαλούμε επικοινωνήστε με την <a href="https://www.grbc.gr/contact/">γραμματεία του Κολεγίου</a>.',
            en: 'If you have a hard time continuing this process, please contact the <a href="https://www.grbc.gr/en/contact/">college secretary</a>.'
        },
        haveAccount: { gr: 'Έχω ήδη λογαριασμό', en: 'I already have an account' },

        // cp
        loggedInAs: { gr: 'Έχετε συνδεθεί ως', en: 'Logged in as' },
        logOut: { gr: 'Αποσύνδεση', en: 'Logout' },
        information: { gr: 'Ενημέρωση', en: 'Information' },
        systemAnouncement: { gr: 'Ανακοίνωση Συστήματος', en: 'System Anouncement' },
        notificationsLoading: { gr: 'Φόρτωση Ειδοποιήσεων', en: 'Loading Notifications' },
        clearAllNotificationsConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να καθαρίσετε όλες τις ειδοποιήσεις σας;',
            en: 'Are you sure you want to clear all your notifications?'
        },
        noNotifications: { gr: 'Δεν υπάρχουν νέες ειδοποιήσεις', en: 'There are no new notifications' },
        notificationTemplates: { gr: 'Πρότυπα Ειδοποιήσεων', en: 'Notification Templates' },
        notificationTemplatePreviewTitle: { gr: 'Προεπισκόπηση Προτύπου Ειδοποίησης', en: 'Notification Template Preview' },
        subjectIn: { gr: 'Θέμα στα', en: 'Subject in' },
        viewTemplate: { gr: 'Προβολή Προτύπου', en: 'View Template' },
        filter: { gr: 'Φίλτρο...', en: 'Filter...' },
        filters: { gr: 'Φίλτρα', en: 'Filters' },
        clearFilter: { gr: 'Καθαρισμός Φίλτρου', en: 'Clear Filter' },

        yes: { gr: 'Ναι', en: 'Yes' },
        no: { gr: 'Όχι', en: 'No' },
        blank: { gr: 'Λευκό', en: 'Blank' },
        or: { gr: ' ή ', en: ' or ' },
        greek: { gr: 'Ελληνικά', en: 'Greek' },
        english: { gr: 'Αγγλικά', en: 'English' },

        administrative: { gr: 'Διοικητικά', en: 'Administrative' },
        system: { gr: 'Σύστημα', en: 'System' },
        systemVariables: { gr: 'Μεταβλητές Συστήματος', en: 'System Variables' },
        variableName: { gr: 'Όνομα Μεταβλητής', en: 'Variables Name' },
        type: { gr: 'Τύπος', en: 'Type' },
        value: { gr: 'Τιμή', en: 'Value' },
        admissions: { gr: 'Εγγραφές', en: 'Admissions' },
        finances: { gr: 'Οικονομικά', en: 'Finances' },
        academics: { gr: 'Ακαδημαϊκά', en: 'Academics' },
        registrar: { gr: 'Υπεύθυνος Μητρώου', en: 'Registrar' },
        cashier: { gr: 'Ταμίας', en: 'Cashier' },
        professor: { gr: 'Καθηγητής', en: 'Professor' },

        errors: { gr: 'Σφάλματα', en: 'Errors' },
        users: { gr: 'Χρήστες', en: 'Users' },
        operation: { gr: 'Λειτουργία', en: 'Operation' },
        operations: { gr: 'Λειτουργίες', en: 'Operations' },
        logs: { gr: 'Ιστορικό', en: 'Logs' },
        recentActions: { gr: 'Πρόσφατες Ενέργειες', en: 'Recent Actions' },
        fileManager: { gr: 'Διαχειριστής Αρχείων', en: 'File Manager' },
        filename: { gr: 'Όνομα Αρχείου', en: 'Filename' },
        filesize: { gr: 'Μέγεθος Αρχείου', en: 'File Size' },
        dbManager: { gr: 'Βάση Δεδομένων', en: 'Database' },
        name: { gr: 'Όνομα', en: 'Name' },
        size: { gr: 'Μέγεθος', en: 'Size' },
        noRows: { gr: 'Αριθμός Εγγραφών', en: 'Number of Rows' },
        downloadDB: { gr: 'Μεταφόρτωση Βάσης Δεδομένων', en: 'Download DB' },
        downloadDBTable: { gr: 'Μεταφόρτωση Πίνακα', en: 'Download Table' },
        onlineDocumentSubmission: { gr: 'Ηλεκτρονική Υποβολή Δικαιολογητικών', en: 'Online Document Submission' },
        onlineDocumentSubmissionInstructions: {
            gr: 'Για την ολοκλήρωση της αίτησής σας θα πρέπει να μας αποστείλετε ευκρινείς σαρώσεις ή φωτογραφίες των παρακάτω:',
            en: 'In order for you to complete your application you will have to submit clear scans or photos of the following documents:'
        },
        onlineDocumentSubmissionInstructions2: {
            gr: '<ul><li><b>Αστυνομική Ταυτότητα</b> (και τις δύο όψεις) ή <b>Διαβατήριο</b> και <b>Άδεια Παραμονής</b> (εάν υπάρχει)</li><li><b>Απολυτήριο Λυκείου</b></li><li><b>Φωτογραφία Διαβατηρίου</b></li></ul>',
            en: '<ul><li><b>National Id</b> (both sides) or <b>Passport</b> and <b>Residence Permit</b> (if available)</li><li><b>Official High School Transcript</b> or <b>ACT Scores</b> or <b>SAT Scores</b></li><li><b>Passport size Photo</b></li></ul>'
        },
        onlineDocumentSubmissionInstructions3: {
            gr: 'Κάντε <b>click</b> για να επιλέξετε τα αρχεία που θέλετε να αποστείλετε, ή αποθέστε τα εδώ με <b>drag-and-drop</b>.<br><br><span class="label green">Μέγιστο μέγεθος 20 MB ανά αρχείο</span>',
            en: 'Please <b>click</b> and choose the files you want to submit, or <b>drag-and-drop</b> them here.<br><br><span class="label green">Maximum file size is 20 MB per file</span>'
        },
        pleaseSelect: { gr: 'Παρακαλώ επιλέξτε...', en: 'Please select...' },
        documentType: { gr: 'Τύπος Δικαιολογητικού', en: 'Supporting Document Type' },
        documentsStillMissing: { gr: 'Δικαιολογητικά που εκκρεμούν', en: 'Documents still missing' },
        emptyLogs: { gr: 'Διαγραφή Ιστορικού', en: 'Empty Logs' },
        teachingSchedule: { gr: 'Πρόγραμμα Διδασκαλίας', en: 'Teaching Schedule' },
        chapelSchedule: { gr: 'Πρόγραμμα Chapel', en: 'Chapel Schedule' },
        sScheduleItem: { gr: ' Διδακτικής Ώρας', en: ' Teaching Hour' },
        sChapelEvent: { gr: ' Ώρας Chapel', en: ' Chapel Event' },
        chapelDescription: { gr: 'Περιγραφή Chapel', en: 'Chapel Description' },
        confirmed: { gr: 'Επιβεβαιωμένο', en: 'Confirmed' },
        notConfirmed: { gr: 'Μη επιβεβαιωμένο', en: 'Not confirmed' },
        programs: { gr: 'Προγράμματα', en: 'Programs' },
        allApplicants: { gr: 'Όλοι οι Υποψήφιοι', en: 'All Applicants' },
        withoutApplication: { gr: 'Χωρίς Αίτηση', en: 'Without Application' },
        courses: { gr: 'Μαθήματα', en: 'Courses' },
        advisor: { gr: 'Ακαδημαϊκός Σύμβουλος', en: 'Academic Advisor' },
        advisors: { gr: 'Ακαδημαϊκοί Σύμβουλοι', en: 'Academic Advisors' },
        advisee: { gr: 'Συμβουλευόμενος', en: 'Advisee' },
        advisees: { gr: 'Συμβουλευόμενοι', en: 'Advisees' },
        students: { gr: 'Φοιτητές', en: 'Students' },
        myAdvisees: { gr: 'Οι φοιτητές που συμβουλεύω ακαδημαϊκά', en: 'My Academic Advisees' },
        graduates: { gr: 'Απόφοιτοι', en: 'Graduates' },
        applications: { gr: 'Αιτήσεις', en: 'Applications' },
        selectedApplicants: { gr: 'Επιλεγμένοι Υποψήφιοι', en: 'Selected Applicants' },
        currentDebt: { gr: 'Τρέχουσες Οφειλές', en: 'Current Debt' },
        myDebt: { gr: 'Οι Οφειλές Μου', en: 'My Debt' },

        showOnlyStudentAccounts: { gr: 'Προβολή μόνο λογαριασμών Φοιτητών', en: 'Show only Student Accounts'},
        totalDebt: { gr: 'Συνολικές Οφειλές', en: 'Total Debt' },
        totalCredit: { gr: 'Συνολικές Πληρωμές', en: 'Total Credit' },
        lastUpdate: { gr: 'Τελευταία Ενημέρωση', en: 'Last Update' },
        balance: { gr: 'Υπόλοιπο', en: 'Balance' },
        waysToPay: {
            gr: '<i class="fas fa-info-circle"></i>&nbsp;&nbsp;&nbsp;Τρόποι πληρωμής',
            en: '<i class="fas fa-info-circle"></i>&nbsp;&nbsp;&nbsp;Ways to pay'
        },
        eurOnly: {
            gr: ' ',
            en: '<div class="alert alert-danger text-center">The college can only accept Euro. Other currencies will not be acceptable for payment.<br>For conversions, please use the following link: <a href="https://www.google.com/finance?q=EURUSD" target="_new">https://www.google.com/finance?q=EURUSD</a></div>'
        },
        wireTransfer: { gr: 'Τραπεζικό Έμβασμα', en: 'Wire Transfer' },
        cash: { gr: 'Μετρητά', en: 'Cash' },
        referToAccounting: { gr: 'Παρακαλούμε απευθυνθείτε στο Λογιστήριο του κολεγίου. &lt;<a href="mailto:accounting@grbc.gr">accounting@grbc.gr</a>&gt;', en: 'Please contact the Accounting department of the college. &lt;<a href="mailto:accounting@grbc.gr">accounting@grbc.gr</a>&gt;' },
        card: { gr: 'Πιστωτική ή χρεωστική κάρτα', en: 'Debit or credit card' },
        bank: { gr: 'Τράπεζα', en: 'Bank' },
        bankAddress: { gr: 'Διεύθυνση Τράπεζας', en: 'Bank Address' },
        beneficiary: { gr: 'Δικαιούχος', en: 'Beneficiary' },
        beneficiaryAddress: { gr: 'Διεύθυνση Δικαιούχου', en: 'Beneficiary Address' },
        accountNumber: { gr: 'Αρ. Λογαριασμού', en: 'Account Number' },
        bankText: { gr: 'ΕΘΝΙΚΗ ΤΡΑΠΕΖΑ ΤΗΣ ΕΛΛΑΔΑΣ – ΥΠΟΚΑΤΑΣΤΗΜΑ ΠΙΚΕΡΜΙΟΥ', en: 'NATIONAL BANK OF GREECE – PIKERMI BRANCH' },
        bankAddressText: { gr: 'Λ. ΜΑΡΑΘΩΝΟΣ 28, 19009, ΠΙΚΕΡΜΙ', en: '28 L. MARATHONOS STR., 19009, PIKERMI, GREECE' },
        beneficiaryText: { gr: 'ΕΤΑΙΡΕΙΑ ΒΙΒΛΙΚΩΝ ΣΠΟΥΔΩΝ', en: 'ETERIA VIVLIKON SPOUDON' },
        beneficiaryAddressText: { gr: 'ΧΡ. ΑΔΑΜΟΠΟΥΛΟΥ 8, 19009, ΠΙΚΕΡΜΙ', en: 'CHR. ADAMOPOULOU 8, 19009, PIKERMI, GREECE' },
        accountNumberText: { gr: '531/200721-51', en: '53120072151' },
        userRecords: { gr: 'Λογαριασμοί', en: 'Records' },
        record: { gr: 'Λογαριασμός', en: 'Records' },
        records: { gr: 'Λογαριασμός', en: 'Records' },
        myRecords: { gr: 'Ο λογαριασμός μου', en: 'My records' },
        category: { gr: 'Κατηγορία', en: 'Category' },
        comment: { gr: 'Σχόλιο', en: 'Comment' },
        amount: { gr: 'Ποσό', en: 'Amount' },
        editRecord: { gr: 'Επεξεργασία Συναλλαγής', en: 'Edit Record' },
        total: { gr: 'Σύνολο', en: 'Total' },
        nextPaymentDue: { gr: 'Επόμενη πληρωμή έως', en: 'Next payment due' },
        newRecord: { gr: 'Νέα Συναλλαγή', en: 'New Record' },
        newTemplate: { gr: 'Νέο Πρότυπο', en: 'New Template' },
        importTemplate: { gr: 'Εισαγωγή Προτύπου', en: 'Import Template' },
        manageTemplates: { gr: 'Διαχείριση Προτύπων', en: 'Manage Templates' },
        preview: { gr: 'Προεπισκόπηση', en: 'Preview' },
        templateName: { gr: 'Όνομα Προτύπου', en: 'Template Name' },
        import: { gr: 'Εισαγωγή', en: 'Import' },
        sendPaymentReminder: { gr: 'Αποστολή ειδοποίησης πληρωμής', en: 'Send payment reminder' },
        messageSentTitle: { gr: 'Το μήνυμα εστάλει', en: 'Message Sent' },
        paymentReminderSent: {
            gr: '<div class="text-center">Η ειδοποίηση πληρωμής έχει αποσταλεί.</div>',
            en: '<div class="text-center">The payment reminder has been sent.</div>'
        },
        onlinePayment: { gr: 'Online Πληρωμή', en: 'Online Payment' },
        markAsPaid: { gr: 'Ολοκλήρωση Πληρωμής', en: 'Mark as Paid' },
        markAsPaidConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να ενημερώσετε το Λογιστήριο ότι η πληρωμή ολοκληρώθηκε;',
            en: 'Are you sure you want to inform the Accountant that the payment has been made?'
        },

        accountTemplates: { gr: 'Πρότυπα Λογαριασμών', en: 'Account Templates' },
        mySchedule: { gr: 'Το πρόγραμμά μου', en: 'My schedule' },
        days: { gr: ' ημέρες', en: ' days' },
        daysU: { gr: 'Ημέρες', en: 'Days' },
        hoursU: { gr: 'Ώρες', en: 'Hours' },
        moreInfo: { gr: 'Αναλυτικά', en: 'More Info' },

        cancel: { gr: 'Ακύρωση', en: 'Cancel' },
        add: { gr: 'Προσθήκη', en: 'Add' },
        edit: { gr: 'Επεξεργασία', en: 'Edit' },
        delete: { gr: 'Διαγραφή', en: 'Delete' },
        clearAll: { gr: 'Καθαρισμός όλων', en: 'Clear all' },
        deletePermanently: { gr: 'Οριστική Διαγραφή', en: 'Delete Permanently' },
        save: { gr: 'Αποθήκευση', en: 'Save' },

        addUser: { gr: 'Προσθήκη Χρήστη', en: 'Add User' },
        addProfessor: { gr: 'Προσθήκη Καθηγητή', en: 'Add Professor' },
        addAdvisor: { gr: 'Προσθήκη Ακαδημαϊκού Συμβούλου', en: 'Add Academic Advisor' },
        nonAdvisors: { gr: 'Καθηγητές που δεν είναι Ακαδημαϊκοί Σύμβουλοι:', en: 'Professors who are not Academic Advisors:' },
        removeAdvisorConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να αφαιρέσετε αυτόν τον Ακαδημαϊκό Σύμβουλο;',
            en: 'Are you sure you want to remove this Academic Advisor?'
        },

        photo: { gr: 'Φωτογραφία', en: 'Photo' },
        fullName: { gr: 'Ονοματεπώνυμο', en: 'Full Name' },
        roles: { gr: 'Ρόλοι', en: 'Roles' },
        addRole: { gr: 'Προσθήκη Ρόλου', en: 'Add Role' },
        removeRole: { gr: 'Αφαίρεση Ρόλου', en: 'Remove Role' },
        removeRoleConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στην αφαίρεση αυτού του ρόλου από αυτήν την λειτουργία;',
            en: 'Are you sure you want to proceed with the removal of this role from this operation?'
        },
        removeRoleFromUserConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στην αφαίρεση αυτού του ρόλου από αυτόν τον χρήστη;',
            en: 'Are you sure you want to proceed with the removal of this role from this user?'
        },
        addProgram: { gr: 'Προσθήκη Προγράμματος', en: 'Add Program'},
        addOperation: { gr: 'Προσθήκη Λειτουργίας', en: 'Add Operation' },
        operationName: { gr: 'Όνομα Λειτουργίας', en: 'Operation Name' },
        date: { gr: 'Ημερομηνία', en: 'Date' },
        registrationDate: { gr: 'Ημερομηνία Εγγραφής', en: 'Registration Date' },
        lastChangeDate: { gr: 'Ημερομηνία Τελευταίας Αλλαγής', en: 'Last Change Date' },
        actions: { gr: 'Ενέργειες', en: 'Actions' },

        userFolder: { gr: 'Φάκελος Χρήστη', en: 'User Folder' },
        academicProgress: { gr: 'Ακαδημαϊκή Πρόοδος', en: 'Academic Progress' },
        transcriptGreek: { gr: 'Επίσημο Αντίγραφο (Ελληνικό)', en: 'Transcript (Greek)' },
        transcriptEnglish: { gr: 'Επίσημο Αντίγραφο (Αγγλικό)', en: 'Transcript (English)' },
        transcriptEnglishECTS: { gr: 'Επίσημο Αντίγραφο (Αγγλικό ECTS)', en: 'Transcript (English ECTS)' },
        loginAs: { gr: 'Είσοδος ως', en: 'Login as' },
        sendPasswordReset: { gr: 'Αποστολή Επαναφοράς Κωδικού Πρόσβασης', en: 'Send Password Reset' },
        doYouConsider: {
            gr: 'Κρίνετε τον Υποψήφιο κατάλληλο για προαγωγή σε Φοιτητή;',
            en: 'Do you consider this Applicant eligible for promotion to Student?'
        },
        voterName: { gr: 'Όνομα Ψηφοφόρου', en: 'Voter\'s Name' },
        vote: { gr: 'Ψήφος', en: 'Vote' },
        suitable: { gr: 'Κατάλληλος', en: 'Suitable' },
        unsuitable: { gr: 'Ακατάλληλος', en: 'Unsuitable' },
        removeVoteFromCandidate: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στη διαγραφή αυτής της ψήφου;',
            en: 'Are you sure you want to proceed with the deletion of this vote?'
        },
        promoteCandidateToStudent: { gr: 'Προαγωγή Υποψηφίου σε Φοιτητή', en: 'Promote Applicant to Student' },
        resetApplicant: { gr: 'Διαγραφή Αιτήσεων Χρήστη', en: 'Delete All User Applications' },
        resetApplicantConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στη διαγραφή όλων των αιτήσεων αυτού του υποψηφίου;',
            en: 'Are you sure you want to proceed with the deletion of all the applications of this applicant?'
        },
        exportApplications: { gr: 'Εκτύπωση Πλήρους Αίτησης', en: 'Export Applications' },
        uploadFile: { gr: 'Μεταφόρτωση Αρχείου', en: 'Upload File' },
        viewFile: { gr: 'Προβολή Αρχείου', en: 'Open File' },
        selectFile: { gr: 'Επιλογή Αρχείου', en: 'Select File' },
        deleteFile: { gr: 'Διαγραφή Αρχείου', en: 'Delete File' },
        deleteFileConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στη διαγραφή αυτού του αρχείου;',
            en: 'Are you sure you want to proceed with the deletion of this file?'
        },
        deleteDocument: { gr: 'Διαγραφή Δικαιολογητικού', en: 'Delete Supporting Document' },
        deleteDocumentConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στη διαγραφή αυτού του εγγράφου;',
            en: 'Are you sure you want to proceed with the deletion of this document?'
        },
        deleteStudent: { gr: 'Υποβίβαση Φοιτητή σε Υποψήφιο', en: 'Demote Student to Candidate' },
        deleteStudentConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε σε υποβιβασμό αυτού του φοιτητή σε υποψήφιο;',
            en: 'Are you sure you want to proceed with the demotion of this student to candidate?'
        },
        deleteUserPermanently: { gr: 'Οριστική Διαγραφή Χρήστη', en: 'Delete User Permanently' },
        deleteUserPermanentlyConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε σε μόνιμη διαγραφή αυτού του χρήστη;',
            en: 'Are you sure you want to proceed with the permanent deletion of this user?'
        },
        confirmationRequired: { gr: 'Η ενέργεια αυτή χρειάζεται επιβεβαίωση', en: 'This action requires confirmation' },

        enrollStudent: { gr: 'Ενεργοποίηση Φοιτητή', en: 'Enroll Student' },
        unenrollStudent: { gr: 'Απενεργοποίηση Φοιτητή', en: 'Unenroll Student' },
        unenrollStudentPermanently: { gr: 'Οριστική Διαγραφή Φοιτητή', en: 'Unenroll Student Permanently' },
        enrollProfessor: { gr: 'Ενεργοποίηση Καθηγητή', en: 'Enroll Professor' },
        unenrollProfessor: { gr: 'Απενεργοποίηση Καθηγητή', en: 'Unenroll Professor' },
        unerollProfessorPermanently: { gr: 'Οριστική Διαγραφή Καθηγητή', en: 'Unenroll Professor Permanently' },

        programRegistry: { gr: 'Μητρώο Προγράμματος', en: 'Program Registry' },
        courseRegistry: { gr: 'Μητρώο Μαθήματος', en: 'Course Registry' },

        personalized: { gr: 'Προσωποποιημένο', en: 'Personalized' },
        weekends: { gr: 'Σαββατοκύριακα', en: 'Weekends' },
        weeks: { gr: 'Εβδομάδες', en: 'Weeks' },
        lYear: { gr: 'έτος', en: 'year' },
        monday: { gr: 'Δευτέρα', en: 'Monday' },
        tuesday: { gr: 'Τρίτη', en: 'Tuesday' },
        wednesday: { gr: 'Τετάρτη', en: 'Wednesday' },
        thursday: { gr: 'Πέμπτη', en: 'Thursday' },
        friday: { gr: 'Παρασκευή', en: 'Friday' },
        saturday: { gr: 'Σάββατο', en: 'Saturday' },
        sunday: { gr: 'Κυριακή', en: 'Sunday' },

        showPreviousWeek: { gr: 'Προβολή Προηγούμενης Εβδομάδας', en: 'Show Previous Week' },
        showCurrentWeek: { gr: 'Προβολή Τρέχουσας Εβδομάδας', en: 'Show Current Week' },
        showNextWeek: { gr: 'Προβολή Επόμενης Εβδομάδας', en: 'Show Next Week' },

        loadingCourses: { gr: 'Φόρτωση Μαθημάτων', en: 'Loading Courses' },
        loadingApplicationProgress: { gr: 'Φόρτωση Προόδου Εγγραφής', en: 'Loading Application Progress' },

        academicPrograms: { gr: 'Ακαδημαϊκά Προγράμματα', en: 'Academic Programs' },
        title: { gr: 'Τίτλος', en: 'Title' },
        titleEn: { gr: 'Τίτλος στα Αγγλικά', en: 'Title in English' },
        titleGr: { gr: 'Τίτλος στα Ελληνικά', en: 'Title in Greek' },
        year: { gr: 'Έτος', en: 'Year' },
        semester: { gr: 'Εξάμηνο', en: 'Semester' },
        semesters: { gr: 'Εξάμηνα', en: 'Semesters' },
        totalStudents: { gr: 'Σύνολο Φοιτητών', en: 'Total Students' },
        activeStudents: { gr: 'Ενεργοί Φοιτητές', en: 'Active Students' },
        allPrograms: { gr: 'Όλα τα Προγράμματα', en: 'All Programs' },

        programCourses: { gr: 'Μαθήματα Προγράμματος', en: 'Program Courses' },
        studentCourses: { gr: 'Μαθήματα Φοιτητή', en: 'Student Courses' },
        newCourse: { gr: 'Νέο Μάθημα', en: 'New Course' },
        editCourse: { gr: 'Επεξεργασία Μαθήματος', en: 'Edit Course' },
        undefined: { gr: 'Απροσδιόριστο', en: 'Undefined' },
        fall1st: { gr: 'Χειμερινό (1ο)', en: 'Fall (1st)' },
        spring2nd: { gr: 'Εαρινό (2ο)', en: 'Spring (2nd)' },
        summer3rd: { gr: 'Θερινό (3ο)', en: 'Summer (3rd)' },
        fractions: { gr: 'Κλάσματα Μαθήματος', en: 'Course Fractions' },
        fractionsUnavailable: {
            gr: 'Μπορούν να προστεθούν μετά τη δημιουργία του Μαθήματος',
            en: 'Can be added after creating the Course'
        },
        activeCourses: { gr: 'Ενεργά Μαθήματα', en: 'Active Courses' },
        inactiveCourses: { gr: 'Μη Ενεργά Μαθήματα', en: 'Inctive Courses' },
        code: { gr: 'Κωδικός', en: 'Code' },
        addToMoodle: { gr: 'Προσθήκη στο Moodle', en: 'Add to Moodle' },
        credits: { gr: 'Πιστωτικές Μονάδες', en: 'Credits' },
        ectsCredits: { gr: 'ECTS Πιστωτικές Μονάδες', en: 'ECTS Credits' },
        requirements: { gr: 'Προαπαιτούμενα', en: 'Requirements' },
        selectCourse: { gr: 'Επιλέξτε Μάθημα', en: 'Select Course' },
        required: { gr: 'Απαιτείται', en: 'Required' },
        graduationRequirement: { gr: 'Απαιτείται για Αποφοίτηση', en: 'Graduation Requirement' },
        showOnMoodle: { gr: 'Προβολή στο Moodle', en: 'Show on Moodle' },

        myCourses: { gr: 'Τα μαθήματά μου', en: 'My Courses' },
        grade: { gr: 'Βαθμός', en: 'Grade' },
        editGrade: { gr: 'Επεξεργασία Βαθμού', en: 'Edit Grade' },
        saveGrade: { gr: 'Αποθήκευση Βαθμού', en: 'Save Grade' },
        incompleteGrade: { gr: 'Ατελής Βαθμός', en: 'Incomplete Grade' },
        passGrade: { gr: 'Επιτυχία', en: 'Pass' },
        noPassGrade: { gr: 'Μη Επιτυχία', en: 'No Pass' },
        deleteGrade: { gr: 'Διαγραφή Βαθμού', en: 'Delete Grade' },
        incomplete: { gr: 'Ατελής', en: 'Incomplete' },
        classified: { gr: 'Διαβαθμισμένο', en: 'Classified' },
        pa: { gr: 'Μέσος όρος', en: 'Average' },
        gpa: { gr: 'Γενικός Μέσος όρος', en: 'GPA' },

        ofJanuary: { gr: 'Ιανουαρίου', en: 'of January' },
        ofFebruary: { gr: 'Φεβρουαρίου', en: 'of February' },
        ofMarch: { gr: 'Μαρτίου', en: 'of March' },
        ofApril: { gr: 'Απριλίου', en: 'of April' },
        ofMay: { gr: 'Μαΐου', en: 'of May' },
        ofJune: { gr: 'Ιουνίου', en: 'of June' },
        ofJuly: { gr: 'Ιουλίου', en: 'of July' },
        ofAugust: { gr: 'Αυγούστου', en: 'of August' },
        ofSeptember: { gr: 'Σεπτεμβρίου', en: 'of September' },
        ofOctober: { gr: 'Οκτωβρίου', en: 'of October' },
        ofNovember: { gr: 'Νοεμβρίου', en: 'of November' },
        ofDecember: { gr: 'Δεκεμβρίου', en: 'of December' },
        the20th: { gr: 'τις 20 ', en: 'the 20th ' },
        today20th: { gr: 'σήμερα (20 ', en: 'today (the 20th ' },
        tomorrow20th: { gr: 'αύριο (20 ', en: 'tomorrow (the 20th ' },
        dayAfterTomorrow20th: { gr: 'μεθαύριο (20 ', en: 'the day after tomorrow (the 20th ' },

        // Academic Progress
        progressItem: { gr: 'Στοιχείο Προόδου', en: 'Progress Item' },
        status: { gr: 'Κατάσταση', en: 'Status' },
        controller: { gr: 'Ελεγκτής', en: 'Controller' },
        chooseFile: { gr: 'Επιλέξτε Αρχείο', en: 'Choose File' },
        unassignFile: { gr: 'Αποσύνδεση Αρχείου', en: 'Unlink File' },
        unassignFileConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στην αποσύνδεση του αρχείου από αυτό το στοιχείο προόδου (το αρχείο δεν θα διαγραφεί);',
            en: 'Are you sure you want to proceed with the unlinking of the file from this progress item (the file will not be deleted)?'
        },
        studentFiles: { gr: 'Αρχεία Φοιτητή', en: 'Student Files' },
        examineApplication: { gr: 'Ελεγχος Αίτησης Εγγραφής', en: 'Examine Application' },
        currentApplication: { gr: 'Τρέχουσα Αίτηση Εγγραφής', en: 'Current Application' },
        setAsComplete: { gr: 'Ολοκλήρωση', en: 'Complete' },
        setAsCompleteConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στην ολοκλήρωση αυτού του στοιχείου;',
            en: 'Are you sure you want to proceed with marking this item as completed?'
        },
        setAsIncomplete: { gr: 'Αναίρεση Ολοκλήρωσης', en: 'Incomplete' },

        // Admissions
        currentApplications: { gr: 'Τρέχουσες Αιτήσεις Εγγραφής', en: 'Active Applications' },
        showOnlyNotYetRevealedApplications: { gr: 'Προβολή μόνο μη αποκεκαλυμμένων Αιτήσεων', en: 'Show only not yet revealed Applications' },
        noProgramChosen: {
            gr: 'Ο υποψήφιος δεν έχει επιλέξει το ακαδημαϊκό πρόγραμμα που τον ενδιαφέρει.',
            en: 'The applicant hasn\'t chosen the academic program they\'re interested in.'
        },
        applicationName: { gr: 'Όνομα Αίτησης', en: 'Application Name' },
        submissionStatus: { gr: 'Κατάσταση Υποβολής', en: 'Submission Status' },
        approvalStatus: { gr: 'Κατάσταση Εγγραφής', en: 'Registration Status' },
        notSubmitted: { gr: 'Δεν έχει υποβληθεί', en: 'Hasn\'t been submitted' },
        submitted: { gr: 'Έχει υποβληθεί', en: 'Submitted' },
        pendingDecision: { gr: 'Εκκρεμεί απόφαση', en: 'Pending Decision' },
        pendingResubmission: { gr: 'Εκκρεμεί νέα υποβολή', en: 'Pending Re-submission' },
        recorded: { gr: 'Καταγράφηκε', en: 'Recorded' },
        notRecorded: { gr: 'Δεν Καταγράφηκε', en: 'Not Recorded' },
        showApplication: { gr: 'Προβολή Αίτησης', en: 'Show Application' },
        editApplication: { gr: 'Επεξεργασία Αίτησης', en: 'Edit Application' },
        familySingle: { gr: 'Άγαμος/η', en: 'Single' },
        familyMarried: { gr: 'Έγγαμος/η', en: 'Married' },
        familyDivorced: { gr: 'Διαζευγμένος/η', en: 'Divorced' },
        familyWidow: { gr: 'Χήρος/α', en: 'Widow' },
        levelModerate: { gr: 'Μέτριο', en: 'Moderate' },
        levelGood: { gr: 'Καλό', en: 'Good' },
        levelVeryGood: { gr: 'Πολύ καλό', en: 'Very good' },
        levelExcellent: { gr: 'Άριστο', en: 'Excellent' },
        accept: { gr: 'Αποδοχή', en: 'Accept' },
        reject: { gr: 'Απόρριψη', en: 'Reject' },
        hideForm: { gr: 'Απόκρυψη Φόρμας', en: 'Hide Form'},
        unhideForm: { gr: 'Αποκάλυψη Φόρμας', en: 'Unhide Form'},
        hideFinancialFormFromApplicant: { gr: 'Απόκρυψη Φόρμας Οικονομικής Ευθύνης', en: 'Hide Financial Liability Form'},
        unhideFinancialFormForApplicant: { gr: 'Αποκάλυψη Φόρμας Οικονομικής Ευθύνης', en: 'Unhide Financial Liability Form'},
        acceptApplication: { gr: 'Αποδοχή Αίτησης', en: 'Accept Application' },
        rejectApplication: { gr: 'Απόρριψη Αίτησης', en: 'Reject Application' },
        finalizeApplication: { gr: 'Οριστική Αποδοχή Αίτησης', en: 'Finalize Application' },
        back: { gr: 'Επιστροφή', en: 'Back' },
        backToApplicants: { gr: 'Επιστροφή στις Αιτήσεις', en: 'Back to Applicants' },

        // Applicant
        candidateSelectProgram: {
            gr: 'Επιλέξτε το ακαδημαϊκό πρόγραμμα που σας ενδιαφέρει:',
            en: 'Select the academic program you are applying for:'
        },
        startApplication: { gr: 'Εκκίνηση Αίτησης', en: 'Start Application' },
        startAuditorApplication: { gr: 'Αίτηση Ακροατή', en: 'Auditor Application' },
        pending: { gr: 'Εκκρεμεί', en: 'Pending' },
        completed: { gr: 'Ολοκληρώθηκε', en: 'Completed' },
        underReview: { gr: 'Υπό Αξιολόγηση', en: 'Under Review' },
        rejected: { gr: 'Απορρίφθηκε', en: 'Rejected' },

        enterInfo: { gr: 'Εισαγωγή Στοιχειων', en: 'Enter Information' },
        viewInformation: { gr: 'Προβολή Στοιχείων', en: 'View Information' },
        noActionNeeded: { gr: 'Δεν απαιτείται ενέργεια', en: 'No action needed' },
        editInfo: { gr: 'Τροποποίηση Στοιχειων', en: 'Edit Information' },

        welcomeTitle: { gr: 'Καλωσόρισμα', en: 'Welcome' },
        welcomeMessage: {
            gr: 'Το Ελληνικό Βιβλικό Κολέγιο σας καλωσορίζει στο <b>JoOS</b>.<br><br>Για να ξεκινήσετε την εγγραφή σας θα πρέπει, πρώτα να επιλέξτε το ακαδημαϊκό πρόγραμμα που σας ενδιαφέρει.<br><br>Παρακαλούμε συμπληρώστε προσεκτικά όλες τις αιτήσεις που θα εμφανιστούν, ώστε να μπορέσουμε να εξετάσουμε εάν τηρούνται οι ελάχιστες προϋποθέσεις εγγραφής.<br><br>Εάν έχετε κάποια ερώτηση, μη διστάσετε να επικοινωνήσετε με τη γραμματεία του κολεγίου.',
            en: 'The Greek Bible College welcomes you to <b>JoOS</b>.<br><br>To begin your registration, you first have to choose the academic program you are interested in.<br><br>Please carefully fill out all the applications that will appear, so that we can examine if the minimum admission requirements are fulfilled.<br><br>If you have any questions, don’t hesitate to contact our college secretary.'
        },

        saveAndContinue: { gr: 'Αποθήκευση και Συνέχεια', en: 'Save and Continue' },
        validate: { gr: 'Έλεγχος', en: 'Validate' },
        requiredField: { gr: 'Υποχρεωτικό πεδίο', en: 'Required Field' },
        requiredChoice: { gr: 'Υποχρεωτική επιλογή', en: 'Required Choice' },
        contactUsForAnyQuestion: { gr: 'Επικοινωνήστε μαζί μας για οποιαδήποτε ερώτηση', en: 'Please contact us if you have any questions' },
        contactUsURL: { gr: 'https://www.grbc.gr/contact/', en: 'https://www.grbc.gr/en/contact/' },
        pleaseSaveChanges: {
            gr: 'Παρακαλούμε αποθηκεύστε τις αλλαγές που έχετε κάνει έως τώρα.',
            en: 'Please save any changes you have made so far.'
        },
        submit: { gr: 'Υποβολή', en: 'Submit' },
        submitAnonymously: { gr: 'Ανώνυμη Υποβολή', en: 'Submit Anonymously' },

        // Forms
        formSubmissionTitle: { gr: 'Υποβολή Φόρμας', en: 'Form Submission' },

        // Evaluations
        myEvaluationReports: { gr: 'Οι Αξιολογήσεις μου', en: 'My Evaluation Reports'},
        evaluationReports: { gr: 'Εκθέσεις Αξιολόγησης', en: 'Evaluation Reports'},
        evaluationReport: { gr: 'Έκθεση Αξιολόγησης', en: 'Evaluation Report'},
        usersWithEvaluationsPending: { gr: 'Χρήστες με αξιολογήσεις που εκκρεμούν', en: 'Users with evaluations pending' },
        removePendingEvaluation: { gr: 'Διαγραφή εκκρεμότητας αξιολόγηγης', en: 'Remove pending evaluation' },
        removePendingEvaluationConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στη διαγραφή αυτής της εκκρεμότητας αξιολόγησης;',
            en: 'Are you sure you want to proceed with the deletion of this pending evaluation?'
         },
        allCourses: { gr: 'Όλα τα διαθέσιμα μαθήματα', en: 'All available courses'},
        allProfessors: { gr: 'Όλοι οι διαθέσιμοι καθηγητές', en: 'All available professors'},
        allYears: { gr: 'Όλα τα διαθέσιμα έτη', en: 'All available years'},
        sendEvaluationForms: { gr: 'Αποστολή Φορμών Αξιολόγησης', en: 'Send Evaluation Forms'},
        sendEvaluationFormsConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στην αποστολή Φορμών Αξιολόγησης για αυτόν τον καθηγητή;',
            en: 'Are you sure you want to proceed with the sending of Evaluation Forms for this professor?'
         },

        evaluationFormsPending: {
            gr: '<div class="text-center">Έχετε φόρμες αξιολόγησης σε εκκρεμότητα.<br><br>Οι φόρμες αξιολόγησης είναι <b>ανώνυμες</b> και είναι εξαιρετικά χρήσιμες για τη βελτίωση της ποιότητας των υπηρεσιών που προσφέρει το Ελληνικό Βιβλικό Κολέγιο.</div>',
            en: '<div class="text-center">You have evaluation forms pending.<br><br>The evaluation forms are <b>anonymous</b> and are extremely useful for improving the quality of the services provided by the Greek Bible College.</div>'
        },
        evaluationFormSubmission: {
            gr: '<div class="text-center">Η φόρμα αξιολόγησης υποβλήθηκε με επυτυχία.<br><br>Ευχαριστούμε!</div>',
            en: '<div class="text-center">The evaluation form has been submitted.<br><br>Thank you!</div>'
        },
        question: { gr: 'Ερώτηση', en: 'Question' },

        // Library
        libraryInfo: {
            gr: '<i class="fas fa-info-circle"></i>&nbsp;&nbsp;&nbsp;Ωράριο προσωπικού βιβλιοθήκης',
            en: '<i class="fas fa-info-circle"></i>&nbsp;&nbsp;&nbsp;Library staff hours'
        },
        libraryClerk: {
            gr: 'Υπεύθυνος βιβλιοθήκης',
            en: 'Library clerk'
        },
        noLibraryCard: {
            gr: 'Δεν έχει εκδοθεί κάρτα βιβλιοθήκης με την διεύθυνση email που έχετε δηλώσει.<br>Παρακαλούμε επικοινωνήστε με τον υπεύθυνο βιβλιοθήκης.',
            en: 'No library card has been issued with your email address.<br>Please contact the library clerk.'
        },
        checkedOutBooks: { gr: 'Δανεισμένα Βιβλία', en: 'Checked Out Books' },
        myBooks: { gr: 'Τα Βιβλία μου', en: 'My Books' },
        libraryCard: { gr: 'Κάρτα Βιβλιοθήκης', en: 'Library Card' },
        newUser: { gr: 'Νέος χρήστης', en: 'New user' },
        selectCategory: { gr: 'Επιλέξτε κατηγορία', en: 'Select category' },
        libraryCards: { gr: 'Κάρτες Βιβλιοθήκης', en: 'Library Cards' },
        checkedOut: { gr: 'Δανεισμένα', en: 'Checked out' },
        enableLibraryCard: { gr: 'Ενεργοποίηση Κάρτας Βιβλιοθήκης', en: 'Enable Library Card' },
        disableLibraryCard: { gr: 'Απενεργοποίηση Κάρτας Βιβλιοθήκης', en: 'Disable Library Card' },
        showHistory: { gr: 'Προβολή Ιστορικού', en: 'Show History' },
        checkedOutBooksByLibraryCard: { gr: 'Κάρτες Βιβλιοθήκης με δανεισμένα Βιβλία', en: 'Library Cards with checked out Books' },
        creditsLeft: { gr: 'Credits που απομένουν: ', en: 'Credits left: ' },
        renewBook: { gr: 'Ανανέωση Βιβλίου', en: 'Renew Book' },
        bookRenewedTitle: { gr: 'Επιτυχής Ανανέωση Βιβλίου', en: 'Book Renewal Successful' },
        bookRenewed: {
            gr: '<div class="text-center">Η νέα ημερομηνία λήξης είναι:<br>$$</div>',
            en: '<div class="text-center">The new due date is:<br>$$</div>'
        },
        libraryCardHistory: { gr: 'Ιστορικό Κάρτας Βιβλιοθήκης', en: 'Library Card History' },
        checkOut: { gr: 'Δανεισμός', en: 'Check Out' },
        checkIn: { gr: 'Είσοδος', en: 'Check In' },
        dueDate: { gr: 'Προθεσμία', en: 'Due' },
        left: { gr: 'Απομένουν', en: 'Left' },
        overdue: { gr: 'Εκπρόθεσμο', en: 'Overdue' },
        removeBook: { gr: 'Διαγραφή Βιβλίου', en: 'Remove Book' },
        showBook: { gr: 'Προβολή Βιβλίου', en: 'Show Book' },
        reserved: { gr: 'Κρατημένο', en: 'Reserved' },
        reservedBooks: { gr: 'Κρατημένα Βιβλία', en: 'Reserved Books' },
        reserveBook: { gr: 'Κράτηση Βιβλίου', en: 'Reserve Book' },
        unreserveBook: { gr: 'Απελευθέρωση Βιβλίου', en: 'Unreserve Book' },
        bookManager: { gr: 'Διαχειριστής Βιβλίου', en: 'Book Manager' },
        noBookWithBarcode: { gr: 'Δεν υπάρχει βιβλίο με αυτό το barcode', en: 'There is no book with this barcode' },
        removeBookConfirmation: {
            gr: 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στη διαγραφή αυτού του βιβλίου;',
            en: 'Are you sure you want to proceed with the deletion of this book?'
        },
        importFromResourceMate: { gr: 'Εισαγωγή από το ResourceMate', en: 'Import from ResourceMate' },
    };

    constructor (private ajax: AjaxService) { }

    getActiveLanguage () {
        return localStorage.getItem('language') ? localStorage.getItem('language') : 'gr';
    }

    // String
    s (s: string) {
        const language = this.getActiveLanguage();
        if (s) {
            return this.dictionary.hasOwnProperty(s) ? (
                this.dictionary[s][language] ?
                this.dictionary[s][language] :
                'No ' + language + ' for "' + s
            ) : s;
        } else {
            return '';
        }
    }

    // Object / Property
    op (o: any, p: string) {
        const language = this.getActiveLanguage();
        return o[p + '_' + language];
    }
}
