import { ScrollArea } from "@shadcn/scroll-area";
import { Separator } from "@shadcn/separator";

export function PostList(data) {
	return (
		<ScrollArea className="h-72 w-48 rounded-md border bg-white">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Posts</h4>
				{data.posts.map((post) => (
					<>
						<div key={post.id} className="text-sm">
							{post.title}:{post.content}
						</div>
						<Separator className="my-2" />
					</>
				))}
			</div>
		</ScrollArea>
	);
}
