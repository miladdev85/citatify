import moment from "moment";

// Set id so we can use the id when rendering. For example as key value.
export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

export const convertFirestoreDate = timestamp => {
  const time = timestamp.toDate();
  return moment(time).calendar(null, {
    lastDay: "[Yesterday at] HH:mm",
    sameDay: "[Today at] HH:mm",
    nextDay: "[Tomorrow at] HH:mm",
    lastWeek: "[last] dddd [at] HH:mm",
    nextWeek: "dddd [at] HH:mm",
    sameElse: "L"
  });
};

export const validateMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
