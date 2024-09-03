
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-[400px] overflow-x-auto">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview" className="tab-trigger">Overview</TabsTrigger>
        <TabsTrigger value="annalytics" className="tab-trigger">Annalytics</TabsTrigger>
        <TabsTrigger value="reports" className="tab-trigger">Reports</TabsTrigger>
        <TabsTrigger value="notifications" className="tab-trigger">Notifications</TabsTrigger>
      </TabsList>
     
    </Tabs>
  )
}
