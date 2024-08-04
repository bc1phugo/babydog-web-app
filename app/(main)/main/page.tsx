import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <div className="py-8 px-4">
      <section className="flex flex-col items-center gap-8">
        <Skeleton className="w-full h-[200px] rounded-full" />
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-bold">600 CATS</div>
          <div className="flex justify-between gap-4">
            <div>
              <div className="text-muted-foreground">Rewards</div>
              <span className="text-center">+ 600</span>
            </div>
            <div>
              <div className="text-muted-foreground">Tasks</div>
              <span className="text-center">+ 0</span>
            </div>
            <div>
              <div className="text-muted-foreground">Invites</div>
              <span className="text-center">+ 0</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>Tasks</div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Card className="flex flex-col items-center">
            <CardHeader>
              <CardDescription>
                Subscribe to <br />
                Channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary">Join</Button>
            </CardContent>
            <CardFooter>100 CATS</CardFooter>
          </Card>
          <Card>
            <CardDescription></CardDescription>
          </Card>
          <Card>
            <CardDescription></CardDescription>
          </Card>
        </div>
      </section>
    </div>
  );
}
