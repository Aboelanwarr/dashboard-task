"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useDispatch} from "react-redux";

export default function DashboardTable() {
  // const dispatch = useDispatch();
  // const tableData = useSelector((state) => state.dashboard.products);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setCategoryList] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(data?.length / itemsPerPage);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // dispatch(setItem(data));
        setData(data.products);
      });
  }, []);
  // Function to handle sorting
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };
  // Sorting logic based on sortBy and sortOrder
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  function nextPage() {
    if (currentPage != numberOfPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage != 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <Input
          className="w-1/3"
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={(value) => setCategoryList(value === "all" ? "" : value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Category"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="all">
              All Categories
            </SelectItem>
            {[...new Set(data.map((item) => item.category))].map(
              (category, index) => (
                <SelectItem key={index} value={category}>
                  {category}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>A list of your recent products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              className=" cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className=" cursor-pointer"
              onClick={() => handleSort("title")}
            >
              Name {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className=" cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead className="">Description</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead className="">Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData
            .filter(
              (item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(
              (item) =>
                filterCategory === "" || item.category === filterCategory
            )
            .slice(
              currentPage * itemsPerPage,
              currentPage * itemsPerPage + itemsPerPage
            )
            .map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="border border-gray-300 px-4 py-2">
                  {item.id}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {item.title}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {item.price}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {item.description}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {item.category}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  <Image
                    src={item.thumbnail}
                    width={100}
                    height={50}
                    alt={item.title || "Product image"}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="w-full flex flex-row items-center p-5">
        <div className="flex flex-row items-center gap-4">
          <span
            className="cursor-pointer font-semibold"
            onClick={() => prevPage()}
          >
            prev
          </span>
          <div className="flex flex-row items-center">
            <span>{currentPage}</span>
            <span>/</span>
            <span>{numberOfPages - 1}</span>
          </div>
          <span
            className="cursor-pointer font-semibold"
            onClick={() => nextPage()}
          >
            next
          </span>
        </div>
      </div>
    </div>
  );
}
