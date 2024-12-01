import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { browser: "Faltas", visitors: 2, fill: "var(--color-chrome)" },
  { browser: "Asistidas", visitors: 20, fill: "var(--color-safari)" },
  { browser: "Tardanzas", visitors: 3, fill: "var(--color-edge)" },
];

const chartConfig = {
  visitors: {
    label: "Dictadas",
  },
  chrome: {
    label: "Faltas",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Asistidas",
    color: "hsl(var(--chart-2))",
  },
  edge: {
    label: "Tardanzas",
    color: "hsl(var(--chart-4))",
  },
};

export function Charts() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  // Crear datos con un valor ficticio si el total es 0
  const adjustedChartData = useMemo(() => {
    if (totalVisitors === 0) {
      return [
        ...chartData,
        { browser: "Empty", visitors: 1, fill: "transparent" }, // Segmento invisible
      ];
    }
    return chartData;
  }, [totalVisitors]);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Resumen de asistencia</CardTitle>
        <CardDescription>Agosto - Octubre 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Dictadas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
