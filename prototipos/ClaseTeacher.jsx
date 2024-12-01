import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";
import { ArrowRight, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ClaseTeacher = () => {
  const cursos = [
    {
      id: "3",
      title: "SEGURIDAD INFORMÁTICA",
      author: "OLIVER ISRAEL SANTANA CARBAJAL",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    // {
    //   id: "5",
    //   title: "SISTEMA DE INFORMACIÓN GERENCIAL",
    //   author: "OLIVER ISRAEL SANTANA CARBAJAL",
    //   image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    // },
  ];

  return (
    <div>
      {/* <Button className="w-full sm:w-48 mb-6">
        Unirse a clase
        <PlusIcon className="size-5" />
      </Button> */}
      <div className="flex gap-6 pb-8 justify-center md:justify-normal">
        <h1 className="font-bold text-xl ">Mis clases</h1>
        {/* <Button size="icon" className="rounded-full">
          <PlusIcon className="size-5" />
        </Button> */}
      </div>

      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"> */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <div>
            <img
              src="https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg"
              alt="/"
              className="aspect-[16/9] size-full object-cover object-center"
            />
          </div>
          <CardContent className="p-6 min-h-32">
            <h3 className="mb-3 text-lg font-semibold">
              SISTEMA DE INFORMACIÓN GERENCIAL
            </h3>
            <p className="text-muted-foreground text-sm">
              OLIVER ISRAEL SANTANA CARBAJAL
            </p>
          </CardContent>
          <CardFooter>
            {/* <div className="flex items-center hover:underline">
                Ir al curso
                <ArrowRight className="ml-2 size-4" />
                </div> */}
            {/* <p className="flex items-center hover:underline">
                Ir al curso
                <ArrowRight className="ml-2 size-4" />
                </p> */}
            <div className="flex flex-col space-y-6">
              <Button className="w-full">
                <Link to={"view"}>Ir al curso</Link>
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
        {cursos.map((curso) => (
          <Card key={curso.id}>
            <div>
              <img
                src={curso?.image}
                alt={curso?.title}
                className="aspect-[16/9] size-full object-cover object-center"
              />
            </div>
            <CardContent className="p-6 min-h-32">
              <h3 className="mb-3 text-lg font-semibold">{curso?.title}</h3>
              <p className="text-muted-foreground text-sm">{curso?.author}</p>
            </CardContent>
            <CardFooter>
              {/* <div className="flex items-center hover:underline">
                Ir al curso
                <ArrowRight className="ml-2 size-4" />
                </div> */}
              {/* <p className="flex items-center hover:underline">
                Ir al curso
                <ArrowRight className="ml-2 size-4" />
                </p> */}
              <div className="flex flex-col space-y-6">
                <Button className="w-full">
                  Ir al curso
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
        {/* {cursos.map((curso) => (
          <a
            key={curso.id}
            href="#"
            className="flex flex-col text-clip rounded-xl border border-border"
          >
            <div>
              <img
                src={curso.image}
                alt={curso.title}
                className="aspect-[16/9] size-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl">
                {curso.title}
              </h3>
              <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">
                {curso.author}
              </p>
              <p className="flex items-center hover:underline">
                Ir al curso
                <ArrowRight className="ml-2 size-4" />
              </p>
            </div>
          </a>
        ))} */}
      </div>
    </div>
  );
};

export default ClaseTeacher;
