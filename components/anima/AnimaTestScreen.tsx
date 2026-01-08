import { Button } from "@/components/ui/button";
//import { Separator } from "@/components/ui/separator";
import { Battery, Signal, Wifi } from "lucide-react";

const profileFields = [
  { label: "Name:", value: "Amelie Griffith" },
  { label: "Age:", value: "22" },
  { label: "Location:", value: "London - UK" },
  { label: "Work Eligibility:", value: "Visa Required" },
  { label: "Work Type:", value: "Permanent" },
  { label: "Disability:", value: "No" },
  { label: "Military Veteran:", value: "Never" },
];

const navigationItems = [
  { label: "My\nPersona" },
  { label: "Job\nMatching" },
  { label: "Get\nInspired" },
];

export default function CreateProfile() {
  return (
    <div className="w-full min-w-[402px] min-h-[874px] relative bg-white">
      <div className="flex flex-col w-full h-full">
        <header className="flex flex-col w-full pt-[21px] pb-0 px-0 z-10">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center justify-center gap-2.5">
              <div className="[font-family:'SF_Pro-Semibold',Helvetica] font-semibold text-system-colors-labels-primary text-[17px] text-center tracking-[0] leading-[22px]">
                9:41
              </div>
            </div>

            <div className="w-[124px] h-2.5" />

            <div className="flex items-center gap-1.5">
              <Signal className="w-4 h-3.5 text-system-colors-labels-primary" />
              <Wifi className="w-4 h-3.5 text-system-colors-labels-primary" />
              <Battery className="w-6 h-3 text-system-colors-labels-primary" />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-auto">
          <div className="bg-[#F5A623] pt-6 pb-12 px-4 relative">
            <h1 className="text-white text-center text-[48px] [font-family:'Brush_Script_MT',cursive] font-normal italic mb-8">
              Talents
            </h1>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-white rounded-t-[100px]" />
          </div>

          <div className="flex flex-col items-center -mt-16 px-4 relative z-10">
            <div className="w-[120px] h-[120px] rounded-full border-4 border-[#F5A623] overflow-hidden bg-white mb-6">
              <img
                src="/images/confident-business-woman-smiling-photo.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full mb-6">
              <h2 className="text-[#F5A623] text-[28px] font-bold [font-family:'Arial',sans-serif] mb-2">
                Profile
              </h2>
              {/*<Separator className="bg-[#F5A623] h-[2px]" />*/}
            </div>

            <div className="w-full space-y-3 mb-4">
              {profileFields.map((field, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-[#6B6B6B] text-[16px] font-bold [font-family:'Arial',sans-serif] min-w-[140px]">
                    {field.label}
                  </div>
                  <div className="flex-1 bg-[#F5DDB8] px-4 py-2 rounded">
                    <div className="text-[#6B6B6B] text-[16px] font-bold [font-family:'Arial',sans-serif]">
                      {field.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-end mb-8">
              <Button className="bg-[#F5A623] hover:bg-[#E09612] text-white font-bold text-[20px] px-8 py-2 h-auto rounded shadow-md [font-family:'Arial',sans-serif]">
                Save
              </Button>
            </div>

            <div className="w-full mb-6">
              <h2 className="text-[#F5A623] text-[28px] font-bold [font-family:'Arial',sans-serif] mb-4">
                Persona
              </h2>

              <div className="flex justify-between items-center mb-6">
                <div className="text-[#6B6B6B] text-[18px] font-bold [font-family:'Arial',sans-serif]">
                  Complete: 0%
                </div>
                <div className="text-[#6B6B6B] text-[18px] font-bold [font-family:'Arial',sans-serif]">
                  Strength: 0%
                </div>
              </div>

              <Button className="w-full bg-[#F5A623] hover:bg-[#E09612] text-white font-bold text-[20px] py-4 h-auto rounded shadow-md [font-family:'Arial',sans-serif]">
                Build
                <br />
                My Persona
              </Button>
            </div>
          </div>
        </main>

        <nav className="flex flex-col items-start gap-2.5 pt-[13px] pb-[42px] px-0 w-full border-t border-system-colors-miscellaneous-bar-border bg-[#ffffffbf] backdrop-blur-[25px]">
          <div className="flex items-start justify-between px-4 w-full">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center justify-center [font-family:'Freeman-Regular',Helvetica] font-normal text-[#ff9500] text-2xl text-center tracking-[0] leading-[22px] whitespace-pre-line"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="w-full h-[34px] flex items-end justify-center pb-2">
          <div className="w-36 h-[5px] bg-system-colors-labels-primary rounded-[100px]" />
        </div>
      </div>
    </div>
  );
}
