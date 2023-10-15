import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-between w-full h-screen">
      <h1>Hello World 2</h1>

      <Button className="bg-light_green text-dark_green justify-start hover:bg-light_green h-10"> Create  <br /> New Project</Button>

    </div>
  );
}
