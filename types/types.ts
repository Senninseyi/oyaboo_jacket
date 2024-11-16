interface IMembershipData {
  member_id: string;
  security_id: string;
}

type ProgressProps = {
  step: number;
};

interface SecurityData {
  id: number;
  dateCreated: Date;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  riderType: null;
  phoneNumber: string;
  dateOfBirth: Date;
  nin: number;
  stateTempID: null;
  regGeoLocation: string;
  memberId: number;
  securityId: number;
  lgaEntity: LGAEntity;
  associationEntity: AssociationEntity;
  branchEntity: BranchEntity;
  unitEntity: UnitEntity;
  isJacketAllocated: boolean;
  isActive: boolean;
  photoReference: string | null;
}

interface AssociationEntity {
  id: number;
  associationCode: string;
  associationName: string;
}

interface BranchEntity {
  id: number;
  branchCode: string;
  branchName: string;
}

interface LGAEntity {
  id: number;
  lgaCode: string;
  lgaName: string;
}

interface UnitEntity {
  id: number;
  unitCode: string;
  unitName: string;
}
