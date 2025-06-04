"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

// Individual registration data type
interface IndividualFormData {
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
  totalPrice: number;
}

// Bulk registration data type
interface BulkFormData {
  organizationType: "highschool" | "culinary" | "company"; // Updated to match actual values
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
  totalPrice: number;
}

// Booth registration data type
interface BoothFormData {
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
  totalPrice: number;
}

// Sponsor registration data type
interface SponsorFormData {
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
  totalPrice: number;
}

interface Registration {
  id: string;
  type: "individual" | "bulk" | "booth" | "sponsor";
  createdAt: string;
  data: IndividualFormData | BulkFormData | BoothFormData | SponsorFormData;
}

export default function Home() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRegistrations(data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchRegistrations();
  }, []);

  const renderDetailsDialog = (registration: Registration) => {
    const data = registration.data;

    switch (registration.type) {
      case "individual":
        const individualData = data as IndividualFormData;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                Individual Registration Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Name:</strong> {individualData.name}
                </p>
                <p>
                  <strong>ID Number:</strong> {individualData.idNumber}
                </p>
                <p>
                  <strong>Email:</strong> {individualData.email}
                </p>
                <p>
                  <strong>Contact Number:</strong>{" "}
                  {individualData.contactNumber}
                </p>
                <p>
                  <strong>Attendee Type:</strong> {individualData.attendeeType}
                </p>
                <p>
                  <strong>Member Status:</strong>{" "}
                  {individualData.isMember ? "Member" : "Non-member"}
                </p>
                <p>
                  <strong>Number of Days:</strong> {individualData.numberOfDays}
                </p>
                <p>
                  <strong>Selected Date:</strong>{" "}
                  {individualData.selectedDate || "Not specified"}
                </p>
                <p>
                  <strong>Pricing Type:</strong>{" "}
                  {individualData.selectedPricing}
                </p>
                <p>
                  <strong>Total Price:</strong> R
                  {individualData.totalPrice.toFixed(2)}
                </p>
                <p>
                  <strong>Invoicing Details:</strong>{" "}
                  {individualData.invoicingDetails}
                </p>
              </div>
              <Button
                className="mt-4"
                onClick={() => setSelectedRegistration(null)}
              >
                Close
              </Button>
            </div>
          </div>
        );

      case "bulk":
        const bulkData = data as BulkFormData;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                Bulk Registration Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Organization Type:</strong>{" "}
                  {bulkData.organizationType}
                </p>
                <p>
                  <strong>School Name:</strong> {bulkData.schoolName}
                </p>
                <p>
                  <strong>VAT Number:</strong> {bulkData.vatNumber || "N/A"}
                </p>
                <p>
                  <strong>Contact Person:</strong> {bulkData.contactPersonName}
                </p>
                <p>
                  <strong>Contact Email:</strong> {bulkData.contactPersonEmail}
                </p>
                <p>
                  <strong>Contact Phone:</strong> {bulkData.contactPersonPhone}
                </p>
                <p>
                  <strong>Member Students:</strong> {bulkData.memberStudents}
                </p>
                <p>
                  <strong>Non-member Students:</strong>{" "}
                  {bulkData.nonMemberStudents}
                </p>
                <p>
                  <strong>Member Teachers:</strong> {bulkData.memberTeachers}
                </p>
                <p>
                  <strong>Non-member Teachers:</strong>{" "}
                  {bulkData.nonMemberTeachers}
                </p>
                <p>
                  <strong>Number of Days:</strong> {bulkData.numberOfDays}
                </p>
                <p>
                  <strong>Selected Date:</strong>{" "}
                  {bulkData.selectedDate || "Not specified"}
                </p>
                <p>
                  <strong>Total Price:</strong> R
                  {bulkData.totalPrice.toFixed(2)}
                </p>
              </div>
              <Button
                className="mt-4"
                onClick={() => setSelectedRegistration(null)}
              >
                Close!
              </Button>
            </div>
          </div>
        );

      case "booth":
        const boothData = data as BoothFormData;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                Booth Registration Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Company Name:</strong> {boothData.companyName}
                </p>
                <p>
                  <strong>Company Address:</strong> {boothData.companyAddress}
                </p>
                <p>
                  <strong>Company Email:</strong> {boothData.companyEmail}
                </p>
                <p>
                  <strong>Contact Number:</strong>{" "}
                  {boothData.companyContactNumber}
                </p>
                <p>
                  <strong>VAT Number:</strong> {boothData.companyVAT}
                </p>
                <p>
                  <strong>Contact Person:</strong>{" "}
                  {boothData.companyContactPerson}
                </p>
                <p>
                  <strong>Exhibitor Size:</strong>{" "}
                  {boothData.exhibitorSize || "N/A"}
                </p>
                <p>
                  <strong>Education Option:</strong>{" "}
                  {boothData.educationOption || "N/A"}
                </p>
                <p>
                  <strong>Industry Option:</strong>{" "}
                  {boothData.industryOption || "N/A"}
                </p>
                <p>
                  <strong>Price Before VAT:</strong> R
                  {boothData.priceBeforeVAT.toFixed(2)}
                </p>
                <p>
                  <strong>VAT Amount:</strong> R{boothData.vatAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Total Price:</strong> R
                  {boothData.totalPrice.toFixed(2)}
                </p>
              </div>
              <Button
                className="mt-4"
                onClick={() => setSelectedRegistration(null)}
              >
                Close
              </Button>
            </div>
          </div>
        );

      case "sponsor":
        const sponsorData = data as SponsorFormData;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                Sponsor Registration Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Company Name:</strong> {sponsorData.companyName}
                </p>
                <p>
                  <strong>Company Address:</strong> {sponsorData.companyAddress}
                </p>
                <p>
                  <strong>Company Email:</strong> {sponsorData.companyEmail}
                </p>
                <p>
                  <strong>Contact Number:</strong>{" "}
                  {sponsorData.companyContactNumber}
                </p>
                <p>
                  <strong>VAT Number:</strong> {sponsorData.companyVAT}
                </p>
                <p>
                  <strong>Contact Person:</strong>{" "}
                  {sponsorData.companyContactPerson}
                </p>
                <p>
                  <strong>Sponsorship Type:</strong>{" "}
                  {sponsorData.sponsorshipType}
                </p>
                <p>
                  <strong>Competition Pantry:</strong>{" "}
                  {sponsorData.competitionPantryType}
                </p>
                <p>
                  <strong>Partner Tier:</strong> {sponsorData.partnerTier}
                </p>
                <p>
                  <strong>Base Price:</strong> R
                  {sponsorData.basePrice.toFixed(2)}
                </p>
                <p>
                  <strong>Discount:</strong> R{sponsorData.discount.toFixed(2)}
                </p>
                <p>
                  <strong>Price Before VAT:</strong> R
                  {sponsorData.priceBeforeVAT.toFixed(2)}
                </p>
                <p>
                  <strong>VAT Amount:</strong> R
                  {sponsorData.vatAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Total Price:</strong> R
                  {sponsorData.totalPrice.toFixed(2)}
                </p>
              </div>
              <Button
                className="mt-4"
                onClick={() => setSelectedRegistration(null)}
              >
                Close
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Registration Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Name/Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration) => (
            <TableRow key={registration.id}>
              <TableCell className="capitalize">{registration.type}</TableCell>
              <TableCell>
                {new Date(registration.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {registration.type === "individual"
                  ? (registration.data as IndividualFormData).name
                  : registration.type === "bulk"
                  ? (registration.data as BulkFormData).schoolName
                  : (registration.data as BoothFormData | SponsorFormData)
                      .companyName}
              </TableCell>
              <TableCell>
                {registration.type === "individual"
                  ? (registration.data as IndividualFormData).email
                  : registration.type === "bulk"
                  ? (registration.data as BulkFormData).contactPersonEmail
                  : (registration.data as BoothFormData | SponsorFormData)
                      .companyEmail}
              </TableCell>
              <TableCell>R {registration.data.totalPrice.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRegistration(registration)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRegistration && renderDetailsDialog(selectedRegistration)}
    </div>
  );
}
