export type SearchParamsType = {
    fromDate: Date;
    toDate: Date;
    textInHeader: string;
    textInBody: string;
    recipientType: string;
    messageType: string;
};

export type OriginalRecipientType = {
    "ID": string | number;
    "MalamID": string | number;
    "Name": string;
    "State": string | number;
    "EnglishName": string;
}

export type OriginalMessageType = {
    "ID": string | number;
    "MalamID": string | number;
    "Name": string;
    "State": string | number;
    "EnglishName": string;
}

export type DropdownOptionType = {
    id: string | number;
    label: string;
};


export type resultsType = {
   "messageId": string | number;
   "category": number;
   "categoryName": string;
   "subject": string;
   "contentHtml": string;
   "messageDate": string;
}

export type rowType = {
      id: string|number;
        messageId: number|string,
        contentHtml: string,
        cells: { value: string }[]
}