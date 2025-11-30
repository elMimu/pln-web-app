import Image from "next/image";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className="flex-col items-center justify-center border w-full h-full">
      <section className="flex justify-center w-full border">
        <div className="relative w-full">
          <Image
            src="/rh-poster.jpg"
            fill
            alt="img-poster"
            className="object-contain"
          />
        </div>
        <div className="flex">
          <div className="border">
            <h2 className="border">ABC</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
              magna eu nibh gravida ullamcorper. Praesent tincidunt, lacus sed
              facilisis porta, arcu velit fermentum mauris, ut aliquam lectus
              mauris vestibulum leo. Proin congue, leo ac commodo dignissim,
              sapien augue blandit neque, nec posuere enim tortor sit amet
              purus. Quisque enim risus, ultricies eu sapien vitae, sollicitudin
              maximus ipsum. Proin bibendum metus quis accumsan euismod.
              Suspendisse sed augue eu tortor pulvinar rutrum ut sed diam. Nunc
              dolor sem, sodales nec sapien eget, vehicula pulvinar ante. Etiam
              quam eros, consequat vel augue non, volutpat sodales enim. Donec
              vitae nisi et est luctus rhoncus. Curabitur quis ante mauris.
              Aenean ultricies viverra eros nec rhoncus.
            </p>
          </div>
        </div>
      </section>

      <section className="border mt-10">
        <h2 className="">General Opnion</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel magna
          eu nibh gravida ullamcorper. Praesent tincidunt, lacus sed
        </p>
      </section>

      <section className="border mt-10">
        <h2>Reviews</h2>
        <div className="flex border justify-center">
          <button className="border">Previous</button>
          <div className="max-w-[60%] border">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
              magna eu nibh gravida ullamcorper. Praesent tincidunt, lacus sed
              facilisis porta, arcu velit fermentum mauris, ut aliquam lectus
              magna eu nibh gravida ullamcorper. Praesent tincidunt, lacus sed
              facilisis porta, arcu velit fermentum mauris, ut aliquam lectus
            </p>
          </div>
          <button className="border">Next</button>
        </div>
      </section>
    </div>
  );
}
