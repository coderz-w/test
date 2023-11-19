export default function MyVideo({ assets }: { assets: string }) {
	return (
		<div className=" w-[100%] flex items-center justify-center">
			<div className=" w-[90vw] flex items-center justify-center h-full">
				<video src={assets} controls preload="auto" autoPlay></video>
			</div>
		</div>
	);
}
