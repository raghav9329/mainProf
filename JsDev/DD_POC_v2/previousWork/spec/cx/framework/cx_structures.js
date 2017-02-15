//CX Automation Framework Library - Data Structures.
//--- Author : Uday Thombre (UThombre@delta.org)

var cxFRMWRKStructures = {
		
	LoadingWaitTimesFor : {
		Environment: 65000,
		Page : 55000,
		Control : 40000,
		Alert : 20000,
		ExceptionalCondition : 120000
	},

	Navigation : {
		PersonalInformationPage : 0,
		BillingInformationPage : 1,
		DependentsPage : 2,
		FacilitiesPage : 3,
		PaymentReviewPage : 4,
		DITGetAQuote :  5,
		MOTGetAQuote : 6
	},
	
	Profile : {
		PrimaryName : 1000,
		MiddleName : 1001,
		LastName : 1002,
		Gender : 1003,
		Birthdate : 1004,
		DOBMonth : 1005,
		DOBDate : 1006,
		DOBYear : 1007,
		SSNumber : 1008,
		AlternateIdentifier : 1009,
		ContactStreet : 1010,
		ContactCity : 1011,
		ContactState : 1012,
		ContactZip : 1013,
		ContactZipAlertGoBack : 1014,
		ContactZipAlertNewQuote : 1015,
		MailingAddress : 1016,
		MailingAddressStreet : 1017,
		MailingAddressCity : 1018,
		MailingAddressState : 1019,
		MailingAddressZip : 1020,
		PhoneType : 1021,
		PhoneNumber : 1022,
		EmailAddress : 1023,
		GoPaperless : 1024,
		BrokerWorked : 1025,
		BrokerNumber : 1026,
		BrokerName : 1027,
		Next : 1028,
		ValidateAll : 1999
	},
	
	Enroll : {
		ZipCode : 1100,
		State : 1101,
		IssuerCode : 1102,
		CoverageType : 1103,
		StartDate : 1104,
		PlanIdentifier : 1105,
		AnnualCost : 1106,
		EnrollmentFee : 1107,
		PlanName : 1108,
		PlanCode : 1109,
		ApplicationIdentifier : 1110,
		Dependents : 1111,
		Submit : 1112
	},
		
	Dependents : {
		Add : 1200,
		Delete : 1201,
		Back: 1202,
		Next: 1203,
		OnAlertBack : 1204,
		OnAlertContinue :  1205,
		NewPremium : 1206,
		Relationship : 1207,
		FirstName : 1208,
		MiddleInitial : 1209,
		LastName : 1210,
		Gender : 1211,
		DOBMonth : 1212,
		DOBDate : 1213,
		DOBYear : 1214,
		Birthdate : 1215,
		ValidateAll : 1299
	},
	
	DependentsUIErrorIndices : {
		Relationship : 0,
		FirstName : 1,
		LastName : 2,
		Gender : 3,
		BirthMonth : 4,
		BirthDate : 5,
		BirthYear : 6
	},

	Facilities : {
		Search : 1300,
		Back : 1301,
		Next : 1302,
		MoreResults : 1303,
		More : 1304,
		Less : 1305,
		Facility : 1306,
		Name : 1307,
		Street1 : 1308,
		Street2 : 1309,
		City : 1310,
		State : 1311,
		Zip : 1312,
		Hours :  1313,
		Accessibility : 1314,
		Language : 1315,
		Information : 1316,
		Applicants : 1317,
		RecentlySelected : 1318,
		Enrollee : 1319,
		List : 1320,
		ValidateAll : 1320
	},
	
	PaymentReview : {
		NameOnCard : 1400,
		CardNumber : 1401,
		ExpirationMonth : 1402,
		ExpirationYear : 1403,
		SecurityCode : 1404,
		HasMailingAddress : 1405,
		MailingStreet : 1406,
		MailingCity : 1407,
		MailingState : 1408,
		MailingZip :1409,
		SaveForFuture : 1410,
		AgreeAuthorization : 1411,
		ReceiptDownload : 1412,
		ReceiptPostage : 1413,
		WhatIsThis : 1414,
		Back : 1415,
		PurchaseNow : 1416,
		DisclosureForContract : 1417,
		PlanSummary : 1418,
		Applicants : 1419,
		ValidateAll : 1420
	},
	
	PaymentCardCategory : {
		ApprovalRegular : 1500,
		ApprovalReverseDecline : 1501,
		ApprovalVisaSwitch : 1502,
		CallAuthorizationCenter : 1503,
		PickUpCard : 1504,
		DeclinedRegular : 1505,
		DeclinedPAAproval05 : 1506,
		DeclinedCVV2 : 1507,
		DeclinedTransactionIdentifierZeros : 1508,
		DeclinedUSD99_99 : 1509,
		DeclinedApprovalReverse : 1510,
		DeclinedExpiredCard : 1511,
		DeclinedExceedsAmountLimit : 1512,
		CallReference : 1513,
		CallReferenceTest :1514,
		ErrorsAmount : 1515,
		ErrorsDLErrorRetry : 1516,
		InvalidCard : 1517,
		InvalidRecordNotFound : 1518,
		InvalidTermIdentifier1 : 1519,
		Retry5270 : 1520,
		Retry5305 : 1521,
		IncorrectPin : 1522,
		IncorrectCard : 1523,
		IncorrectServiceNotAllowed : 1524
	},
	
	PaymentCardLocale : {
		USA : 1600,
		CANADA : 1601,
		USAPurchasing : 1602
	},
	
	Receipt : {
		ApplicantName : 1700,
		SubmissionDate : 1701,
		PlanPurchased : 1702,
		ConfirmationNumber : 1703,
		EffectiveDate : 1704,
		TotalPaid : 1705,
		PlanSummary : 1706,
		Applicants : 1707,
		Primary : 1708,
		PrimaryName : 1709,
		PrimaryFacility : 1710,
		PrimaryFacilityStreet : 1711,
		PrimaryFacilityCity : 1712,
		PrimaryFacilityState : 1713,
		PrimaryFacilityZip : 1714,
		PrimaryFacilityPhone : 1715,
		Dependents : 1716,
		DependentsName : 1717,
		DependentsFacility : 1718,
		DependentsFacilityStreet : 1719,
		DependentsFacilityCity : 1720,
		DependentsFacilityState : 1721,
		DependentsFacilityZip : 1722,
		DependentsFacilityPhone : 1723,
		ValidateAll : 1724
	},
	
	Validations : {
		Defaults : 2000,
		Fields : 2001,
		Usecases : 2002,
		Errors : 2003,
		PageOnBack : 2004
	},

    ReportLocations : {
		All : 3000,
		Console : 3001,
		XML : 3002,
		HTML : 3003,
		JSON : 3004
	},

	ReportFiles : {
		Directory : '../spec/cx/reports/',
		ConsoleLog : '_console.log'
	},
	
	MAPPlanSummary : {
		'Product' : {
			'Name' : ''
		},
		'Plan' : {
			'Type' : '',
			'Premium' : '',
			'Fee' : '',
			'Title' : '',
			'Description' : ''
		},
		'Enrollee' : {
			'Applicants' : [],
			'Facilities' : []
		}
	},
	
	Operations : {
		Navigate : 4000,
		Validate : 4001,
		NegativeTest : 4002
	},

	MessageLocations : {
		Header : 5000,
		Control : 5001
	},
	
	FrameworkUIActions : {
		EnterData : 6000,
		Check : 6001,
		UnCheck : 6002,
		Erase : 6003,
	},

	PlanSummary : {
		Company : 7000,
		Name : 7001,
		Premium: 7002,
		Fee : 7003,
		Title : 7004,
		Description : 7005,
		Type : 7006,
		EnrolleeName : 7007,
		EnrolleeFacility : 7008,
		All : 7009
	},
	
	Pages : {
		PersonalInformation : 8000,
		Dependents : 8001,
		Facilities : 8002,
		PaymentReceipt : 8003,
		Payment : 8004,
		Receipt : 8005,
		ApplicationReceipt : 8006,
		GetQuote : 8007,
		HCentivePlans : 8008
	},
	
	Validators: {
		Caption : 9000,
		Placeholder : 9001,
		Information : 9003,
		Contents : 9004,
		Errors : 9005,
		Summary : 9006
	},
	
	Locators : {
		CSS : 20000,
		XPATH : 20001,
		TAG : 20002,
		MODEL : 20003,
		BUTTON_TEXT : 20004,
		PARTIAL_BUTTON_TEXT : 20005,
		CSS_CONTAINING_TEXT : 20006,
		CLASS_NAME : 20007,
		LINK_TEXT : 20008,
		JAVA_SCRIPT : 20009,
		NAME : 20010,
		PARTIAL_LINK_TEXT : 20011
	},

	Writers : {
		ASCII : 30000,
		HTML : 30001,
		CSV : 30002
	},
	
	DateFormats : {
		MonthDDYYYY : 40000,
		MMDDYYYY : 40001,
		RegularMonth : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	},

	Environments : {
		LOCAL : 'https://localhost:3000/enroll/',
		DEVRC : 'https://rc-lx7999.ut.dentegra.lab:3000/enroll/',
		DIT : 'https://dit3.deltadentalins.com/',
		MOT : 'https://mot.deltadentalins.com/',
		DELTADentalPlans : 'https://mot.deltadentalins.com/indEnroll/search/quotes'
	},
	
	BrowserActions : {
		Refresh : 50000,
		Back : 50001,
		Forward : 50002
	}
};
 
module.exports = cxFRMWRKStructures;
