export const MobileScreenSize = 576;
export const TabletScreenSize = 768;
export const MidScreenSize = 1440;

export const DefaultLimit = 10;


// #PROJECT STATUS
export const PROJECTSTATUS = {
    ACTIVE: "active",
    NOTACTIVE: "notactive",
  };
  export const ProjectSelectStatusTag = {
    [PROJECTSTATUS.ACTIVE]: { text: "ProjectStatusActive" },
    [PROJECTSTATUS.NOTACTIVE]: { text: "ProjectStatusNotActive" },
  };
  export const ProjectSelectDraftStatus = [
    { name: ProjectSelectStatusTag[PROJECTSTATUS.ACTIVE].text, value: PROJECTSTATUS.ACTIVE },
  ];
  export const ProjectSelectAddStatus = [
    { name: ProjectSelectStatusTag[PROJECTSTATUS.ACTIVE].text, value: PROJECTSTATUS.ACTIVE },
    {
      name: ProjectSelectStatusTag[PROJECTSTATUS.NOTACTIVE].text,
      value: PROJECTSTATUS.NOTACTIVE,
    },
  ];
  export const ProjectSelectAddAllStatus = [
    { name: ProjectSelectStatusTag[PROJECTSTATUS.ACTIVE].text, value: PROJECTSTATUS.ACTIVE },
    {
      name: ProjectSelectStatusTag[PROJECTSTATUS.NOTACTIVE].text,
      value: PROJECTSTATUS.NOTACTIVE,
    },
  ];