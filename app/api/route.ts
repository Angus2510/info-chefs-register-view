import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface IndividualRegistrationData {
  name: string;
  idNumber: string;
  email: string;
  contactNumber: string;
  invoicingDetails: string;
  attendeeType: "student" | "general" | "scholar";
  isMember: boolean;
  numberOfDays: "one" | "two";
  selectedDate?: string;
  selectedPricing: string;
  paymentStatus: string;
  reference: string;
  totalPrice: number;
}

interface BulkRegistrationData {
  organizationType: "highschool" | "culinary" | "company";
  schoolName: string;
  vatNumber?: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  memberStudents: number;
  nonMemberStudents: number;
  memberTeachers: number;
  nonMemberTeachers: number;
  numberOfDays: "one" | "two";
  selectedDate?: string;
  paymentStatus: string;
  reference: string;
  totalPrice: number;
}

interface BoothRegistrationData {
  exhibitorSize?: "2sqm" | "4sqm" | "6sqm" | "";
  educationOption?: string;
  industryOption?: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyContactNumber: string;
  companyVAT: string;
  companyContactPerson: string;
  priceBeforeVAT: number;
  vatAmount: number;
  paymentStatus: string;
  reference: string;
  totalPrice: number;
}

interface SponsorRegistrationData {
  sponsorshipType: string;
  competitionPantryType: string;
  partnerTier: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyContactNumber: string;
  companyVAT: string;
  companyContactPerson: string;
  basePrice: number;
  discount: number;
  priceBeforeVAT: number;
  vatAmount: number;
  paymentStatus: string;
  reference: string;
  totalPrice: number;
}

type RegistrationData = {
  id: string;
  type: "individual" | "bulk" | "booth" | "sponsor";
  createdAt: string;
  data:
    | IndividualRegistrationData
    | BulkRegistrationData
    | BoothRegistrationData
    | SponsorRegistrationData;
};

export async function GET() {
  try {
    const registrations = await prisma.baseRegistration.findMany({
      include: {
        individualRegistration: {
          select: {
            name: true,
            idNumber: true,
            email: true,
            contactNumber: true,
            invoicingDetails: true,
            attendeeType: true,
            isMember: true,
            numberOfDays: true,
            selectedDate: true,
            selectedPricing: true,
          },
        },
        bulkRegistration: {
          select: {
            organizationType: true,
            schoolName: true,
            vatNumber: true,
            contactPersonName: true,
            contactPersonEmail: true,
            contactPersonPhone: true,
            memberStudents: true,
            nonMemberStudents: true,
            memberTeachers: true,
            nonMemberTeachers: true,
            numberOfDays: true,
            selectedDate: true,
          },
        },
        boothRegistration: {
          select: {
            exhibitorSize: true,
            educationOption: true,
            industryOption: true,
            companyName: true,
            companyAddress: true,
            companyEmail: true,
            companyContactNumber: true,
            companyVAT: true,
            companyContactPerson: true,
            priceBeforeVAT: true,
            vatAmount: true,
          },
        },
        sponsorRegistration: {
          select: {
            sponsorshipType: true,
            competitionPantryType: true,
            partnerTier: true,
            companyName: true,
            companyAddress: true,
            companyEmail: true,
            companyContactNumber: true,
            companyVAT: true,
            companyContactPerson: true,
            basePrice: true,
            discount: true,
            priceBeforeVAT: true,
            vatAmount: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!registrations.length) {
      return NextResponse.json(
        { error: "No registrations found" },
        { status: 404 }
      );
    }
    interface PrismaIndividualRegistration {
      name: string;
      idNumber: string;
      email: string;
      contactNumber: string;
      invoicingDetails: string;
      attendeeType: string; // Changed from literal type to string
      isMember: boolean;
      numberOfDays: string; // Changed from literal type to string
      selectedDate?: string | null;
      selectedPricing: string;
    }
    interface PrismaBulkRegistration {
      organizationType: string; // Changed from literal type to string
      schoolName: string;
      vatNumber?: string | null;
      contactPersonName: string;
      contactPersonEmail: string;
      contactPersonPhone: string;
      memberStudents: number;
      nonMemberStudents: number;
      memberTeachers: number;
      nonMemberTeachers: number;
      numberOfDays: string; // Changed from literal type to string
      selectedDate?: string | null;
    }
    interface PrismaBoothRegistration {
      exhibitorSize?: string | null; // Accepts string or null
      educationOption?: string | null;
      industryOption?: string | null;
      companyName: string;
      companyAddress: string;
      companyEmail: string;
      companyContactNumber: string;
      companyVAT: string;
      companyContactPerson: string;
      priceBeforeVAT: number;
      vatAmount: number;
    }

    interface PrismaSponsorRegistration {
      sponsorshipType: string;
      competitionPantryType: string;
      partnerTier: string;
      companyName: string;
      companyAddress: string;
      companyEmail: string;
      companyContactNumber: string;
      companyVAT: string;
      companyContactPerson: string;
      basePrice: number;
      discount: number;
      priceBeforeVAT: number;
      vatAmount: number;
    }

    interface PrismaBaseRegistration {
      id: string;
      createdAt: Date;
      paymentStatus: string;
      reference: string;
      totalPrice: number;
      individualRegistration?: PrismaIndividualRegistration | null;
      bulkRegistration?: PrismaBulkRegistration | null;
      boothRegistration?: PrismaBoothRegistration | null;
      sponsorRegistration?: PrismaSponsorRegistration | null;
    }

    const transformedRegistrations: RegistrationData[] = registrations.map(
      (reg: PrismaBaseRegistration): RegistrationData => {
        let type: "individual" | "bulk" | "booth" | "sponsor";
        let data:
          | IndividualRegistrationData
          | BulkRegistrationData
          | BoothRegistrationData
          | SponsorRegistrationData;

        if (reg.individualRegistration) {
          type = "individual";
          const { selectedDate, ...rest } = reg.individualRegistration;
          data = {
            ...rest,
            selectedDate: selectedDate ?? undefined,
            paymentStatus: reg.paymentStatus,
            reference: reg.reference,
            totalPrice: reg.totalPrice,
          } as IndividualRegistrationData;
        } else if (reg.bulkRegistration) {
          type = "bulk";
          const { selectedDate, ...rest } = reg.bulkRegistration;
          data = {
            ...rest,
            selectedDate: selectedDate ?? undefined,
            paymentStatus: reg.paymentStatus,
            reference: reg.reference,
            totalPrice: reg.totalPrice,
          } as BulkRegistrationData;
        } else if (reg.boothRegistration) {
          type = "booth";
          const { exhibitorSize, educationOption, industryOption, ...rest } =
            reg.boothRegistration;
          data = {
            ...rest,
            exhibitorSize: exhibitorSize ?? undefined,
            educationOption: educationOption ?? undefined,
            industryOption: industryOption ?? undefined,
            paymentStatus: reg.paymentStatus,
            reference: reg.reference,
            totalPrice: reg.totalPrice,
          } as BoothRegistrationData;
        } else {
          type = "sponsor";
          data = {
            ...reg.sponsorRegistration!,
            paymentStatus: reg.paymentStatus,
            reference: reg.reference,
            totalPrice: reg.totalPrice,
          } as SponsorRegistrationData;
        }

        return {
          id: reg.id,
          type,
          createdAt: reg.createdAt.toISOString(),
          data,
        };
      }
    );

    return NextResponse.json(transformedRegistrations);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
