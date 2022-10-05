import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomerAdd from "../components/forms/customerAdd";
import CustomerUpdate from "../components/forms/customerUpdate";
import CustomerList from "../components/forms/customerList";
import CustomerDelete from "../components/forms/customerDelete";

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.container}>
      <Head>
        <title>Demo Form</title>
        <meta
          name="description"
          content="Demoing a form with a database"
        />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Sample customers form</h1>

        <Tabs>
          <TabList>
            <Tab>Add</Tab>
            <Tab>Update</Tab>
            <Tab>Delete</Tab>
            <Tab>List</Tab>
          </TabList>

          <TabPanel>
            <CustomerAdd></CustomerAdd>
          </TabPanel>
          <TabPanel>
            <CustomerUpdate></CustomerUpdate>
          </TabPanel>
          <TabPanel>
            <CustomerDelete></CustomerDelete>
          </TabPanel>
          <TabPanel>
            <CustomerList></CustomerList>
          </TabPanel>
        </Tabs>
      </main>

      <footer className={styles.footer}>&copy; {year} Edward Distel</footer>
    </div>
  );
}
