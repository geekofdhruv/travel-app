import Heading from "../components/heading";
import QuestionsList from "../components/questions";
import Image from "../components/image";



function questionPage() {
  return (
    <div className="flex">
      <div className="flex w-1/2 h-[100vh]">
        <Image />
      </div>
      <div className="w-1/2 p-4 flex-col justify-center">
        <Heading text={"Personalize Your Travel Experience"} />
         <div className="mt-8" >
          <QuestionsList
            questions={[
              {
                label: 'Destination preference',
                options: [
                  { label: 'Beach', value: 'beach' },
                  { label: 'Mountain', value: 'mountain' },
                  { label: 'City', value: 'city' },
                ],
              },
              {
                label: 'What type of traveler are you?',
                options: [
                  { label: 'Adventurous', value: 'adventurous' },
                  { label: 'Relaxed', value: 'relaxed' },
                  { label: 'Cultural Explorer', value: 'cultural' },
                  { label: 'Nature Lover', value: 'nature' },
                ],
              },
              {
                label: 'Trip Type?',
                options: [
                  { label: 'Planned', value: 'planned' },
                  { label: 'Spontaneous', value: 'spontaneous' },
                ],
              },
            ]}
          />
        
        </div>
        
      </div>
    </div>
  );
}

export default questionPage;
