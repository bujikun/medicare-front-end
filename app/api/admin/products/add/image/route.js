import { doImageUpload,} from "@/lib/util";

const POST = async (request) => {
  return doImageUpload(request);
}
export { POST };