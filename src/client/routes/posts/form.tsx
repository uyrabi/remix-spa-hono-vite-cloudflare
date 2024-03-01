import { Form } from "@remix-run/react"

import { Button } from "@shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcn/card"
import { Input } from "@shadcn/input"
import { Label } from "@shadcn/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/select"

export function PostForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
        <CardDescription>Description here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" id="post_form">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Title of your post" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Select name="content">
                <SelectTrigger id="content">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" form="post_form">Send</Button>
      </CardFooter>
    </Card>
  )
}
