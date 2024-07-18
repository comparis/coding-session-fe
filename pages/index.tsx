import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

type Listing = {
  title: string;
  dealType: "Rent" | "Buy";
  realestateType: "Flat" | "House";
  price: number;
  rooms: number;
};

export const getServerSideProps = (async (context) => {
  const data = await fetch(
    "https://cb7872bd-6f31-48e8-b9dd-4e63f88d2c2e-00-2itmukcy99ju.worf.replit.dev:5000/listing",
  );
  const response = (await data.json()) as Listing[];

  return {
    props: {
      listings: response,
    },
  };
}) satisfies GetServerSideProps<{ listings: Listing[] }>;

const Home = ({
  listings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>comapris.ch</title>
        <meta name="description" content="comparis.ch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to comparis.ch</h1>
        <h2>Here are our rent properties</h2>
        <div className={styles.grid}>
          {listings
            .filter((listing) => listing.dealType === "Rent")
            .map((listing, index) => (
              <div className={styles.card}>
                <h2>{listing.title}</h2>
                <dl className={styles.details}>
                  <dt>Price:</dt>
                  <dd>{listing.price}</dd>
                  <dt>Rooms:</dt>
                  <dd>{listing.rooms}</dd>
                  <dt>Type:</dt>
                  <dd>{listing.realestateType}</dd>
                </dl>
              </div>
            ))}
        </div>

        <h2>Here are our buy properties</h2>
        <div className={styles.grid}>
          {listings
            .filter((listing) => listing.dealType === "Buy")
            .map((listing, index) => (
              <div className={styles.card}>
                <h2>{listing.title}</h2>
                <dl className={styles.details}>
                  <dt>Price:</dt>
                  <dd>{listing.price}</dd>
                  <dt>Rooms:</dt>
                  <dd>{listing.rooms}</dd>
                  <dt>Type:</dt>
                  <dd>{listing.realestateType}</dd>
                </dl>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Home;