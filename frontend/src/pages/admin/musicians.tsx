import LayoutAdmin from "@/layouts/layout-admin";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InstrumentType, useGetInstrumentTypesQuery, useSearchMusiciansQuery } from "@/graphql/generated/schema";
import Select from "react-select";

export default function Musicians() {
  const [instrumentTypeIds, setInstrumentTypeIds] = useState<string>("");
  const { data } = useSearchMusiciansQuery({
    variables: {
      instrumentTypeId: instrumentTypeIds,
    },
  });
  const musicians = data?.musicians || []

  console.log(musicians)

  const { data: instrumentsData} = useGetInstrumentTypesQuery()
  const instrumentTypes = instrumentsData?.instrumentTypes || []

  const [selectedInstrumentTypes, setSelectedInstrumentTypes] = useState<InstrumentType[]>([]);

  useEffect(()=>{
    setInstrumentTypeIds(selectedInstrumentTypes.map((i)=>i.id).join(','))
  }, [selectedInstrumentTypes])
  return (
    <LayoutAdmin>
      <h2 className="mb-10">Liste des musiciens du collectif</h2>
      <div className="mb-10">
            <label htmlFor="instrumentTypes">
              <span>Filtrer par Instrument(s)</span>
            </label>
            <Select
              className="mt-3"
              options={instrumentTypes}
              getOptionValue={(o: any) => o.value || (o.id.toString() as any)}
              getOptionLabel={(o: any) => o.label || o.name}
              isMulti
              name="instrumentTypes"
              id="instrumentTypes"
              value={selectedInstrumentTypes}
              onChange={(selectedInstrumentTypes) => {
                setSelectedInstrumentTypes(selectedInstrumentTypes as any);
              }}
            />
          </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prénom</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Instruments</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {musicians.map((musician)=>(
            <TableRow key={musician.id} className="hover:bg-pearl">
            <TableCell>{musician.firstName}</TableCell>
            <TableCell>{musician.lastName}</TableCell>
            <TableCell>{musician.instrumentTypes.map((i)=>i.name).join(', ')}</TableCell>
            <TableCell>{musician.email}</TableCell>
            <TableCell>{musician.phoneNumber}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </LayoutAdmin>
  );
}
