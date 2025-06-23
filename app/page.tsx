"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Search,
  Plus,
  Upload,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  BarChart3,
  MapPin,
  Clock,
  Users,
  Car,
  Bike,
  UserX,
  Package,
  AlertTriangle,
  Scale,
  Copy,
  Save,
  X,
  MoreHorizontal,
} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Person {
  id: string
  name: string
  cedula: string
}

interface StatRecord {
  id: string
  date: string
  time: string
  location: string
  personasAbordadas: number
  personasConsultadas: number
  vehiculosAbordados: number
  vehiculosInvestigados: number
  motosAbordadas: number
  motosInvestigadas: number
}

interface Statistics {
  totalPersonasAbordadas: number
  totalPersonasConsultadas: number
  totalVehiculosAbordados: number
  totalVehiculosInvestigados: number
  totalMotosAbordadas: number
  totalMotosInvestigadas: number
  records: StatRecord[]
}

interface Detenido {
  id: string
  nombre: string
  cedula: string
  delito: string
  fiscal: string
  expediente: string
  fecha: string
  hora: string
  ubicacion: string
}

interface DecomisoDroga {
  id: string
  marihuana: number
  marihuanaKilos?: number
  marihuanaDosis?: number
  marihuanaCigarrillos?: number
  marihuanaPuchos?: number
  marihuanaOtros?: string
  cocaina: number
  cocainaKilos?: number
  cocainaDosis?: number
  cocainaPuntas?: number
  cocainaOtros?: string
  crack: number
  crackDosis?: number
  crackPiedras?: number
  crackOtros?: string
  drogasSinteticas: number
  metanfetaminas?: number
  ketamina?: number
  extasis?: number
  lsd?: number
  pastillas?: number
  sinteticasOtros?: string
  fecha: string
  hora: string
  ubicacion: string
  observaciones: string
}

export default function ControlCivicoMovil() {
  const [people, setPeople] = useState<Person[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDataCollapsed, setIsDataCollapsed] = useState(false)
  const [newPerson, setNewPerson] = useState({ name: "", cedula: "" })
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [statistics, setStatistics] = useState<Statistics>({
    totalPersonasAbordadas: 0,
    totalPersonasConsultadas: 0,
    totalVehiculosAbordados: 0,
    totalVehiculosInvestigados: 0,
    totalMotosAbordadas: 0,
    totalMotosInvestigadas: 0,
    records: [],
  })
  const [newStatRecord, setNewStatRecord] = useState({
    location: "",
    personasAbordadas: 0,
    personasConsultadas: 0,
    vehiculosAbordados: 0,
    vehiculosInvestigados: 0,
    motosAbordadas: 0,
    motosInvestigadas: 0,
  })
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const { toast } = useToast()
  const [detenidos, setDetenidos] = useState<Detenido[]>([])
  const [decomisos, setDecomisos] = useState<DecomisoDroga[]>([])
  const [newDetenido, setNewDetenido] = useState({
    nombre: "",
    cedula: "",
    delito: "",
    fiscal: "",
    expediente: "",
    ubicacion: "",
  })
  const [newDecomiso, setNewDecomiso] = useState({
    marihuana: 0,
    marihuanaKilos: 0,
    marihuanaDosis: 0,
    marihuanaCigarrillos: 0,
    marihuanaPuchos: 0,
    marihuanaOtros: "",
    cocaina: 0,
    cocainaKilos: 0,
    cocainaDosis: 0,
    cocainaPuntas: 0,
    cocainaOtros: "",
    crack: 0,
    crackDosis: 0,
    crackPiedras: 0,
    crackOtros: "",
    drogasSinteticas: 0,
    metanfetaminas: 0,
    ketamina: 0,
    extasis: 0,
    lsd: 0,
    pastillas: 0,
    sinteticasOtros: "",
    ubicacion: "",
    observaciones: "",
  })

  // State for person to delete confirmation
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null)

  // Estados para edición manual del corte Pococi
  const [isEditingCorte, setIsEditingCorte] = useState(false)
  const [manualCorte, setManualCorte] = useState({
    personasAbordadas: 0,
    personasConsultadas: 0,
    vehiculosAbordados: 0,
    vehiculosInvestigados: 0,
    motosAbordadas: 0,
    motosInvestigadas: 0,
    capturasDecomiso: 0,
    detenidos: 0,
    observaciones: "",
  })

  // Actualizar fecha y hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Cargar datos del localStorage
  useEffect(() => {
    try {
      const savedPeople = localStorage.getItem("controlCivico_people")
      const savedStats = localStorage.getItem("controlCivico_statistics")
      const savedDetenidos = localStorage.getItem("controlCivico_detenidos")
      const savedDecomisos = localStorage.getItem("controlCivico_decomisos")

      if (savedPeople) setPeople(JSON.parse(savedPeople))
      if (savedStats) setStatistics(JSON.parse(savedStats))
      if (savedDetenidos) setDetenidos(JSON.parse(savedDetenidos))
      if (savedDecomisos) setDecomisos(JSON.parse(savedDecomisos))
    } catch (error) {
      console.error("Failed to load data from localStorage:", error)
      toast({
        title: "Error de Carga",
        description: "No se pudieron cargar los datos guardados. Empezando con una sesión nueva.",
        variant: "destructive",
      })
    }
  }, [toast])

  const saveData = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(`Failed to save data to localStorage (key: ${key}):`, error)
      toast({
        title: "Error al Guardar",
        description: "No se pudieron guardar los cambios. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  // Guardar personas en localStorage
  const savePeople = (newPeople: Person[]) => {
    setPeople(newPeople)
    saveData("controlCivico_people", newPeople)
  }

  // Guardar estadísticas en localStorage
  const saveStatistics = (newStats: Statistics) => {
    setStatistics(newStats)
    saveData("controlCivico_statistics", newStats)
  }

  // Guardar detenidos en localStorage
  const saveDetenidos = (newDetenidos: Detenido[]) => {
    setDetenidos(newDetenidos)
    saveData("controlCivico_detenidos", newDetenidos)
  }

  // Guardar decomisos en localStorage
  const saveDecomisos = (newDecomisos: DecomisoDroga[]) => {
    setDecomisos(newDecomisos)
    saveData("controlCivico_decomisos", newDecomisos)
  }

  // Agregar nueva persona
  const addPerson = () => {
    if (!newPerson.name.trim() || !newPerson.cedula.trim()) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos",
        variant: "destructive",
      })
      return
    }

    // Verificar si la cédula ya existe
    if (people.some((p) => p.cedula === newPerson.cedula)) {
      toast({
        title: "Cédula Duplicada",
        description: "Esta cédula ya ha sido registrada.",
        variant: "destructive",
      })
      return
    }

    // Use a more unique ID generation
    const newId = `${newPerson.cedula}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    savePeople([...people, { ...newPerson, id: newId }])
    setNewPerson({ name: "", cedula: "" })
    toast({
      title: "Persona Registrada",
      description: `${newPerson.name} ha sido añadido exitosamente.`,
    })
  }

  // Function to clean up duplicate entries
  const cleanupDuplicatePeople = () => {
    // Remove duplicates by cedula (keep the first occurrence)
    const uniquePeople = people.filter((person, index, self) => 
      index === self.findIndex(p => p.cedula === person.cedula)
    )
    
    // Also ensure all IDs are unique by regenerating them if needed
    const peopleWithUniqueIds = uniquePeople.map((person, index) => ({
      ...person,
      id: `${person.cedula}_${Date.now()}_${index}`
    }))
    
    if (peopleWithUniqueIds.length !== people.length) {
      savePeople(peopleWithUniqueIds)
      toast({
        title: "Limpieza Completada",
        description: `Se eliminaron ${people.length - peopleWithUniqueIds.length} entradas duplicadas y se regeneraron IDs únicos.`,
      })
    }
  }

  // Clean up duplicates on component mount
  useEffect(() => {
    cleanupDuplicatePeople()
  }, [])

  const updatePerson = () => {
    if (!editingPerson) return
    // Verificar que la cédula editada no exista ya en otra persona
    if (people.some((p) => p.cedula === editingPerson.cedula && p.id !== editingPerson.id)) {
      toast({
        title: "Cédula Duplicada",
        description: "Esta cédula ya pertenece a otra persona registrada.",
        variant: "destructive",
      })
      return
    }
    savePeople(people.map((p) => (p.id === editingPerson.id ? editingPerson : p)))
    toast({
      title: "Registro Actualizado",
      description: "Los datos de la persona han sido modificados.",
    })
    setEditingPerson(null)
  }

  const deletePerson = (id: string) => {
    savePeople(people.filter((p) => p.id !== id))
    toast({
      title: "Registro Eliminado",
      description: "La persona ha sido eliminada del registro.",
      variant: "destructive",
    })
  }

  const addDetenido = () => {
    if (!newDetenido.nombre.trim() || !newDetenido.cedula.trim() || !newDetenido.delito.trim()) {
      toast({
        title: "Campos Incompletos",
        description: "Nombre, cédula y delito son obligatorios.",
        variant: "destructive",
      })
      return
    }

    const newId = Date.now().toString()
    const now = new Date()
    const newEntry = {
      ...newDetenido,
      id: newId,
      fecha: now.toLocaleDateString("es-ES"),
      hora: now.toLocaleTimeString("es-ES"),
    }
    saveDetenidos([...detenidos, newEntry])
    setNewDetenido({ nombre: "", cedula: "", delito: "", fiscal: "", expediente: "", ubicacion: "" })
    toast({ title: "Detenido Registrado", description: "El registro ha sido creado exitosamente." })
  }

  const addDecomiso = () => {
    if (!newDecomiso.ubicacion.trim()) {
      toast({ title: "Ubicación Requerida", description: "Por favor, indique la ubicación del decomiso.", variant: "destructive" })
      return
    }
    const newId = Date.now().toString()
    const now = new Date()
    const newEntry = {
      ...newDecomiso,
      id: newId,
      fecha: now.toLocaleDateString("es-ES"),
      hora: now.toLocaleTimeString("es-ES"),
    }
    saveDecomisos([...decomisos, newEntry])
    // Reset form after submission could be added here if needed
    toast({ title: "Decomiso Registrado", description: "El decomiso ha sido registrado exitosamente." })
  }

  const deleteDetenido = (id: string) => {
    saveDetenidos(detenidos.filter((d) => d.id !== id))
    toast({ title: "Registro de Detenido Eliminado", variant: "destructive" })
  }

  const deleteDecomiso = (id: string) => {
    saveDecomisos(decomisos.filter((d) => d.id !== id))
    toast({ title: "Registro de Decomiso Eliminado", variant: "destructive" })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "text/plain") {
      toast({
        title: "Archivo no válido",
        description: "Por favor, seleccione un archivo de texto (.txt).",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n").filter((line) => line.trim() !== "")
      const newPeople = lines
        .map((line, index) => {
          const parts = line.trim().split(/\s+/)
          if (parts.length >= 2) {
            const cedula = parts[0]
            const name = parts.slice(1).join(" ")
            if (!people.some((p) => p.cedula === cedula)) {
              // Use a more unique ID generation to avoid duplicates
              return { id: `${cedula}_${Date.now()}_${index}`, name, cedula }
            }
          }
          return null
        })
        .filter((p): p is Person => p !== null)

      if (newPeople.length > 0) {
        savePeople([...people, ...newPeople])
        toast({
          title: "Carga Masiva Exitosa",
          description: `${newPeople.length} personas han sido añadidas. Se omitieron duplicados.`,
        })
      } else {
        toast({
          title: "Sin Novedades",
          description: "No se añadieron personas nuevas. Puede que ya estuvieran registradas o el archivo esté vacío.",
          variant: "default",
        })
      }
    }
    reader.onerror = () => {
      toast({
        title: "Error de Lectura",
        description: "No se pudo leer el archivo seleccionado.",
        variant: "destructive",
      })
    }
    reader.readAsText(file)
    // Reset file input to allow uploading the same file again
    event.target.value = ""
  }

  const registerStatistic = () => {
    if (!newStatRecord.location.trim()) {
      toast({
        title: "Ubicación Requerida",
        description: "Por favor, ingrese la ubicación del evento.",
        variant: "destructive",
      })
      return
    }

    const now = new Date()
    const newRecord: StatRecord = {
      id: now.toISOString(),
      date: now.toLocaleDateString("es-ES"),
      time: now.toLocaleTimeString("es-ES"),
      location: newStatRecord.location,
      personasAbordadas: newStatRecord.personasAbordadas,
      personasConsultadas: newStatRecord.personasConsultadas,
      vehiculosAbordados: newStatRecord.vehiculosAbordados,
      vehiculosInvestigados: newStatRecord.vehiculosInvestigados,
      motosAbordadas: newStatRecord.motosAbordadas,
      motosInvestigadas: newStatRecord.motosInvestigadas,
    }
    const newStats: Statistics = {
      ...statistics,
      totalPersonasAbordadas: statistics.totalPersonasAbordadas + newRecord.personasAbordadas,
      totalPersonasConsultadas: statistics.totalPersonasConsultadas + newRecord.personasConsultadas,
      totalVehiculosAbordados: statistics.totalVehiculosAbordados + newRecord.vehiculosAbordados,
      totalVehiculosInvestigados: statistics.totalVehiculosInvestigados + newRecord.vehiculosInvestigados,
      totalMotosAbordadas: statistics.totalMotosAbordadas + newRecord.motosAbordadas,
      totalMotosInvestigadas: statistics.totalMotosInvestigadas + newRecord.motosInvestigadas,
      records: [newRecord, ...statistics.records],
    }
    saveStatistics(newStats)
    setNewStatRecord({
      location: "",
      personasAbordadas: 0,
      personasConsultadas: 0,
      vehiculosAbordados: 0,
      vehiculosInvestigados: 0,
      motosAbordadas: 0,
      motosInvestigadas: 0,
    })
    toast({ title: "Evento Estadístico Registrado", description: "Los datos han sido actualizados." })
  }

  const filteredPeople = people.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) || person.cedula.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const clearAllRecords = () => {
    savePeople([])
    saveStatistics({
      totalPersonasAbordadas: 0,
      totalPersonasConsultadas: 0,
      totalVehiculosAbordados: 0,
      totalVehiculosInvestigados: 0,
      totalMotosAbordadas: 0,
      totalMotosInvestigadas: 0,
      records: [],
    })
    saveDetenidos([])
    saveDecomisos([])
    toast({ title: "Todos los registros han sido eliminados." })
  }

  const startEditingCorte = () => {
    setManualCorte({
      ...manualCorte,
      personasAbordadas: statistics.totalPersonasAbordadas,
      personasConsultadas: statistics.totalPersonasConsultadas,
      vehiculosAbordados: statistics.totalVehiculosAbordados,
      vehiculosInvestigados: statistics.totalVehiculosInvestigados,
      motosAbordadas: statistics.totalMotosAbordadas,
      motosInvestigadas: statistics.totalMotosInvestigadas,
      detenidos: detenidos.length,
      capturasDecomiso: decomisos.length,
    })
    setIsEditingCorte(true)
  }

  const saveManualCorte = () => {
    // Here you would typically save the manualCorte state somewhere
    // For this example, we just exit the editing mode
    setIsEditingCorte(false)
    toast({ title: "Corte Manual Guardado", description: "Los datos del corte han sido actualizados." })
  }

  const cancelEditingCorte = () => {
    setIsEditingCorte(false)
  }

  const copyCorteToClipboard = () => {
    const corteData = isEditingCorte ? manualCorte : {
      ...statistics,
      detenidos: detenidos,
      capturasDecomiso: decomisos,
    };
  
    const detenidosText = detenidos.map(d => `\n- ${d.nombre} (${d.delito})`).join('');
  
    const corteText = `*FUERZA PÚBLICA DRP POCOCÍ*
*CONTROL CÍVICO MÓVIL*
*FECHA:* ${new Date().toLocaleDateString("es-ES")}

*Corte:*
*Personas Abordadas:* ${isEditingCorte ? corteData.personasAbordadas : statistics.totalPersonasAbordadas}
*Personas Consultadas:* ${isEditingCorte ? corteData.personasConsultadas : statistics.totalPersonasConsultadas}
*Vehículos Abordados:* ${isEditingCorte ? corteData.vehiculosAbordados : statistics.totalVehiculosAbordados}
*Vehículos Investigados:* ${isEditingCorte ? corteData.vehiculosInvestigados : statistics.totalVehiculosInvestigados}
*Motos Abordadas:* ${isEditingCorte ? corteData.motosAbordadas : statistics.totalMotosAbordadas}
*Motos Investigadas:* ${isEditingCorte ? corteData.motosInvestigadas : statistics.totalMotosInvestigadas}
*Capturas por Decomiso:* ${decomisos.length}
*Detenidos:*${detenidosText.length > 0 ? detenidosText : ' Ninguno'}
`;
    navigator.clipboard.writeText(corteText).then(() => {
      toast({ title: "Corte copiado al portapapeles." })
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Toaster />
      {/* Header */}
      <header className="bg-white bg-decorative text-blue-900 p-4 sm:p-6 shadow-xl sticky top-0 z-30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-lg text-center md:text-left">Ossap</h1>
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-6">
            <Button variant="fancy" size="sm" onClick={clearAllRecords} className="shadow-md">
              Limpiar todos los registros
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="fancy" className="shadow-md flex items-center gap-2">
                  Controles Vehiculares <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white text-gray-900 shadow-xl border-2 border-blue-200">
                <DropdownMenuLabel className="font-bold text-blue-700">Estadísticas Vehiculares</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" /> Personas Abordadas
                  </span>
                  <span className="font-bold">{statistics.totalPersonasAbordadas}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" /> Personas Consultadas
                  </span>
                  <span className="font-bold">{statistics.totalPersonasConsultadas}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-green-500" /> Vehículos Abordados
                  </span>
                  <span className="font-bold">{statistics.totalVehiculosAbordados}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-green-500" /> Vehículos Investigados
                  </span>
                  <span className="font-bold">{statistics.totalVehiculosInvestigados}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Bike className="h-4 w-4 text-orange-500" /> Motos Abordadas
                  </span>
                  <span className="font-bold">{statistics.totalMotosAbordadas}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Bike className="h-4 w-4 text-orange-500" /> Motos Investigadas
                  </span>
                  <span className="font-bold">{statistics.totalMotosInvestigadas}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-blue-800 shadow-md border-2 border-cyan-400"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-white/90 backdrop-blur border-l-4 border-blue-200 shadow-2xl overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-blue-800">
                    <BarChart3 className="h-5 w-5" />
                    Estadísticas
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-8 pb-8">
                  {/* Fecha y Hora Actual */}
                  <Card className="shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Fecha y Hora Actual
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-mono text-blue-900">
                        <div>{currentDateTime.toLocaleDateString("es-ES")}</div>
                        <div>{currentDateTime.toLocaleTimeString("es-ES")}</div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Panel Especial de Estadísticas Totales */}
                  <Card className="border-2 border-blue-500 bg-white bg-decorative shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-center text-xl font-bold text-blue-900 drop-shadow">Corte Pococi</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyCorteToClipboard}
                            className="border-blue-300 text-blue-700 hover:bg-blue-100"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copiar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={startEditingCorte}
                            className="border-blue-300 text-blue-700 hover:bg-blue-100"
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {isEditingCorte ? (
                        // Modo de edición manual
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-sm font-medium text-blue-800">Personas Abordadas</Label>
                              <Input
                                type="number"
                                value={manualCorte.personasAbordadas}
                                onChange={(e) => setManualCorte({ ...manualCorte, personasAbordadas: parseInt(e.target.value) || 0 })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-blue-800">Personas Consultadas</Label>
                              <Input
                                type="number"
                                value={manualCorte.personasConsultadas}
                                onChange={(e) => setManualCorte({ ...manualCorte, personasConsultadas: parseInt(e.target.value) || 0 })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-blue-800">Vehículos Abordados</Label>
                              <Input
                                type="number"
                                value={manualCorte.vehiculosAbordados}
                                onChange={(e) => setManualCorte({ ...manualCorte, vehiculosAbordados: parseInt(e.target.value) || 0 })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-blue-800">Vehículos Investigados</Label>
                              <Input
                                type="number"
                                value={manualCorte.vehiculosInvestigados}
                                onChange={(e) =>
                                  setManualCorte({ ...manualCorte, vehiculosInvestigados: parseInt(e.target.value) || 0 })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-blue-800">Motos Abordadas</Label>
                              <Input
                                type="number"
                                value={manualCorte.motosAbordadas}
                                onChange={(e) => setManualCorte({ ...manualCorte, motosAbordadas: parseInt(e.target.value) || 0 })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-blue-800">Motos Investigadas</Label>
                              <Input
                                type="number"
                                value={manualCorte.motosInvestigadas}
                                onChange={(e) => setManualCorte({ ...manualCorte, motosInvestigadas: parseInt(e.target.value) || 0 })}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-blue-800">Observaciones</Label>
                            <Input
                              value={manualCorte.observaciones}
                              onChange={(e) => setManualCorte({ ...manualCorte, observaciones: e.target.value })}
                              placeholder="Observaciones adicionales..."
                              className="mt-1"
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button onClick={saveManualCorte} className="bg-green-600 hover:bg-green-700">
                              <Save className="h-4 w-4 mr-1" />
                              Guardar
                            </Button>
                            <Button variant="outline" onClick={cancelEditingCorte}>
                              <X className="h-4 w-4 mr-1" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Modo de visualización normal
                        <>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between p-2 bg-blue-100 rounded">
                              <span className="flex items-center gap-2">
                                <span>👫</span>
                                <span>Abordadas</span>
                              </span>
                              <span className="font-bold text-blue-800">{statistics.totalPersonasAbordadas}</span>
                            </div>

                            <div className="flex items-center justify-between p-2 bg-blue-100 rounded">
                              <span className="flex items-center gap-2">
                                <span>👫</span>
                                <span>Consultadas</span>
                              </span>
                              <span className="font-bold text-blue-800">{statistics.totalPersonasConsultadas}</span>
                            </div>

                            <div className="flex items-center justify-between p-2 bg-blue-100 rounded">
                              <span className="flex items-center gap-2">
                                <span>🚗</span>
                                <span>Abordados</span>
                              </span>
                              <span className="font-bold text-blue-800">{statistics.totalVehiculosAbordados}</span>
                            </div>

                            <div className="flex items-center justify-between p-2 bg-blue-100 rounded">
                              <span className="flex items-center gap-2">
                                <span>🚙</span>
                                <span>Investigados</span>
                              </span>
                              <span className="font-bold text-blue-800">{statistics.totalVehiculosInvestigados}</span>
                            </div>

                            <div className="flex items-center justify-between p-2 bg-blue-100 rounded">
                              <span className="flex items-center gap-2">
                                <span>🏍️</span>
                                <span>Abordadas</span>
                              </span>
                              <span className="font-bold text-blue-800">{statistics.totalMotosAbordadas}</span>
                            </div>

                            <div className="flex items-center justify-between p-2 bg-blue-100 rounded">
                              <span className="flex items-center gap-2">
                                <span>🛵</span>
                                <span>Investigadas</span>
                              </span>
                              <span className="font-bold text-blue-800">{statistics.totalMotosInvestigadas}</span>
                            </div>
                          </div>

                          {/* Línea separadora */}
                          <div className="border-t border-blue-200 my-3"></div>

                          {/* Información de capturas y detenidos */}
                          <div className="space-y-2 text-sm">
                            {decomisos.length > 0 && (
                              <div className="text-center text-blue-800 p-2 bg-blue-100 rounded">
                                <span className="font-medium">
                                  {decomisos.length === 1 ? "Una captura" : `${decomisos.length} capturas`} por decomiso.
                                </span>
                              </div>
                            )}

                            {detenidos.length > 0 && (
                              <div className="text-center text-blue-800 p-2 bg-blue-100 rounded">
                                <span className="font-medium">
                                  {detenidos.length === 1
                                    ? `Un detenido por ${detenidos[0].delito.toLowerCase()}`
                                    : `${detenidos.length} detenidos`}
                                </span>
                              </div>
                            )}

                            {detenidos.length === 0 && decomisos.length === 0 && (
                              <div className="text-center text-blue-600 italic p-2 bg-blue-50 rounded">Sin capturas registradas</div>
                            )}
                          </div>

                          {/* Detalle de Detenidos */}
                          {detenidos.length > 0 && (
                            <div className="space-y-2 text-sm mt-4 pt-4 border-t border-blue-200">
                              <div className="text-center text-blue-900 font-bold mb-3 text-base">Detalle de Detenidos</div>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {detenidos.map((detenido) => (
                                  <div key={detenido.id} className="p-2 bg-red-50 rounded border border-red-200">
                                    <div className="font-medium text-red-800 text-xs">👤 {detenido.nombre}</div>
                                    <div className="text-red-700 text-xs">🆔 Cédula: {detenido.cedula}</div>
                                    <div className="text-red-700 text-xs">⚖️ Delito: {detenido.delito}</div>
                                    <div className="text-red-600 text-xs">📅 {detenido.fecha} - {detenido.hora}</div>
                                    <div className="text-red-600 text-xs">📍 {detenido.ubicacion}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {decomisos.length > 0 && (
                            <div className="space-y-2 text-sm mt-4 pt-4 border-t border-blue-200">
                              <div className="text-center text-blue-900 font-bold mb-3 text-base">Detalle de Decomisos</div>
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {decomisos.map((decomiso) => (
                                  <div key={decomiso.id} className="p-2 bg-orange-50 rounded border border-orange-200">
                                    <div className="text-orange-800 text-xs font-medium">
                                      📅 {decomiso.fecha} - {decomiso.hora}
                                    </div>
                                    <div className="text-orange-700 text-xs">📍 {decomiso.ubicacion}</div>

                                    {/* Marihuana */}
                                    {(decomiso.marihuana > 0 ||
                                      decomiso.marihuanaKilos > 0 ||
                                      decomiso.marihuanaCigarrillos > 0 ||
                                      decomiso.marihuanaPuchos > 0 ||
                                      decomiso.marihuanaOtros) && (
                                      <div className="mt-1 p-1 bg-green-50 rounded border border-green-200">
                                        <span className="text-green-700 text-xs font-medium">🌿 Marihuana:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {decomiso.marihuana > 0 && (
                                            <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                                              {decomiso.marihuana}g
                                            </span>
                                          )}
                                          {decomiso.marihuanaKilos > 0 && (
                                            <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                                              {decomiso.marihuanaKilos}kg
                                            </span>
                                          )}
                                          {decomiso.marihuanaCigarrillos > 0 && (
                                            <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                                              {decomiso.marihuanaCigarrillos} cig
                                            </span>
                                          )}
                                          {decomiso.marihuanaPuchos > 0 && (
                                            <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                                              {decomiso.marihuanaPuchos} puch
                                            </span>
                                          )}
                                          {decomiso.marihuanaOtros && (
                                            <span className="text-xs bg-green-200 text-green-800 px-1 rounded italic">
                                              {decomiso.marihuanaOtros}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Cocaína */}
                                    {(decomiso.cocaina > 0 ||
                                      decomiso.cocainaKilos > 0 ||
                                      decomiso.cocainaDosis > 0 ||
                                      decomiso.cocainaPuntas > 0 ||
                                      decomiso.cocainaOtros) && (
                                      <div className="mt-1 p-1 bg-gray-50 rounded border border-gray-200">
                                        <span className="text-gray-700 text-xs font-medium">❄️ Cocaína:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {decomiso.cocaina > 0 && (
                                            <span className="text-xs bg-gray-200 text-gray-800 px-1 rounded">{decomiso.cocaina}g</span>
                                          )}
                                          {decomiso.cocainaKilos > 0 && (
                                            <span className="text-xs bg-gray-200 text-gray-800 px-1 rounded">
                                              {decomiso.cocainaKilos}kg
                                            </span>
                                          )}
                                          {decomiso.cocainaDosis > 0 && (
                                            <span className="text-xs bg-gray-200 text-gray-800 px-1 rounded">
                                              {decomiso.cocainaDosis} dosis
                                            </span>
                                          )}
                                          {decomiso.cocainaPuntas > 0 && (
                                            <span className="text-xs bg-gray-200 text-gray-800 px-1 rounded">
                                              {decomiso.cocainaPuntas} puntas
                                            </span>
                                          )}
                                          {decomiso.cocainaOtros && (
                                            <span className="text-xs bg-gray-200 text-gray-800 px-1 rounded italic">
                                              {decomiso.cocainaOtros}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Crack */}
                                    {(decomiso.crack > 0 ||
                                      decomiso.crackDosis > 0 ||
                                      decomiso.crackPiedras > 0 ||
                                      decomiso.crackOtros) && (
                                      <div className="mt-1 p-1 bg-yellow-50 rounded border border-yellow-200">
                                        <span className="text-yellow-700 text-xs font-medium">💎 Crack:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {decomiso.crack > 0 && (
                                            <span className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded">{decomiso.crack}g</span>
                                          )}
                                          {decomiso.crackDosis > 0 && (
                                            <span className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded">
                                              {decomiso.crackDosis} dosis
                                            </span>
                                          )}
                                          {decomiso.crackPiedras > 0 && (
                                            <span className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded">
                                              {decomiso.crackPiedras} piedras
                                            </span>
                                          )}
                                          {decomiso.crackOtros && (
                                            <span className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded italic">
                                              {decomiso.crackOtros}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Drogas Sintéticas */}
                                    {(decomiso.drogasSinteticas > 0 ||
                                      decomiso.metanfetaminas > 0 ||
                                      decomiso.ketamina > 0 ||
                                      decomiso.extasis > 0 ||
                                      decomiso.lsd > 0 ||
                                      decomiso.pastillas > 0 ||
                                      decomiso.sinteticasOtros) && (
                                      <div className="mt-1 p-1 bg-purple-50 rounded border border-purple-200">
                                        <span className="text-purple-700 text-xs font-medium">🧪 Sintéticas:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {decomiso.drogasSinteticas > 0 && (
                                            <span className="text-xs bg-purple-200 text-purple-800 px-1 rounded">
                                              {decomiso.drogasSinteticas}g
                                            </span>
                                          )}
                                          {decomiso.metanfetaminas > 0 && (
                                            <span className="text-xs bg-purple-200 text-purple-800 px-1 rounded">
                                              {decomiso.metanfetaminas}g Met
                                            </span>
                                          )}
                                          {decomiso.ketamina > 0 && (
                                            <span className="text-xs bg-purple-200 text-purple-800 px-1 rounded">
                                              {decomiso.ketamina}g Ket
                                            </span>
                                          )}
                                          {decomiso.extasis > 0 && (
                                            <span className="text-xs bg-purple-200 text-purple-800 px-1 rounded">
                                              {decomiso.extasis} Éxtasis
                                            </span>
                                          )}
                                          {decomiso.lsd > 0 && (
                                            <span className="text-xs bg-purple-200 text-purple-800 px-1 rounded">
                                              {decomiso.lsd} LSD
                                            </span>
                                          )}
                                          {decomiso.pastillas > 0 && (
                                            <span className="text-xs bg-purple-200 text-purple-800 px-1 rounded">
                                              {decomiso.pastillas} Pastillas
                                            </span>
                                          )}
                                          {decomiso.sinteticasOtros && (
                                            <span className="text-xs bg-purple-200 text-purple-800 px-1 rounded italic">
                                              {decomiso.sinteticasOtros}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {decomiso.observaciones && (
                                      <div className="mt-1 text-orange-600 text-xs italic">📝 {decomiso.observaciones}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                  {/* Registro de Eventos Estadísticos */}
                  {statistics.records.length > 0 && (
                    <Card className="shadow-md border-blue-300">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold text-blue-800 flex items-center gap-2">
                          <MapPin className="h-5 w-5" /> Registro de Eventos Estadísticos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-4">
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {statistics.records.slice(0, 5).map((record) => (
                            <div key={record.id} className="p-2 bg-blue-100 rounded text-xs">
                              <div className="font-medium text-blue-800">📍 {record.location}</div>
                              <div className="text-blue-600">
                                {record.date} - {record.time}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {record.personasAbordadas > 0 && (
                                  <span className="bg-blue-200 text-blue-800 px-1 rounded text-xs">
                                    P.A: {record.personasAbordadas}
                                  </span>
                                )}
                                {record.personasConsultadas > 0 && (
                                  <span className="bg-blue-200 text-blue-800 px-1 rounded text-xs">
                                    P.C: {record.personasConsultadas}
                                  </span>
                                )}
                                {record.vehiculosAbordados > 0 && (
                                  <span className="bg-green-200 text-green-800 px-1 rounded text-xs">
                                    V.A: {record.vehiculosAbordados}
                                  </span>
                                )}
                                {record.vehiculosInvestigados > 0 && (
                                  <span className="bg-green-200 text-green-800 px-1 rounded text-xs">
                                    V.I: {record.vehiculosInvestigados}
                                  </span>
                                )}
                                {record.motosAbordadas > 0 && (
                                  <span className="bg-orange-200 text-orange-800 px-1 rounded text-xs">
                                    M.A: {record.motosAbordadas}
                                  </span>
                                )}
                                {record.motosInvestigadas > 0 && (
                                  <span className="bg-orange-200 text-orange-800 px-1 rounded text-xs">
                                    M.I: {record.motosInvestigadas}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto py-4 sm:py-6 lg:py-10 px-3 sm:px-4 space-y-6 sm:space-y-8 lg:space-y-10">
        <Card className="shadow-lg border-blue-200 bg-white bg-decorative">
          <CardHeader>
            <CardTitle className="flex items-center flex-wrap gap-2">
              <Upload className="h-6 w-6 text-blue-700 flex-shrink-0" />
              <span className="text-lg sm:text-xl font-bold text-blue-800">Carga Masiva de Personas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Label htmlFor="file-upload" className="text-blue-900 text-sm sm:text-base">
                Seleccione un archivo de texto (.txt) para cargar la lista de personas.
              </Label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic">
                * El formato del archivo debe ser: `cedula nombre apellido1 apellido2` por cada línea.
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Formulario de Registro de Persona */}
        <Card className="shadow-lg border-blue-200 mb-10 bg-white bg-decorative">
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <CardTitle className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 flex-wrap">
              <Users className="h-6 w-6 flex-shrink-0" /> 
              <span>Registrar Persona</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nombre" className="text-base font-semibold">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  value={newPerson.name}
                  onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                  placeholder="Nombre completo"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label htmlFor="cedula" className="text-base font-semibold">
                  Cédula
                </Label>
                <Input
                  id="cedula"
                  value={newPerson.cedula}
                  onChange={(e) => setNewPerson({ ...newPerson, cedula: e.target.value })}
                  placeholder="Número de cédula"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="button" onClick={addPerson} className="w-full md:w-auto text-lg py-2 px-8" variant="fancy">
                  Registrar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Personas Registradas */}
        <Card className="shadow-lg border-blue-200 bg-white bg-decorative">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 flex-wrap">
              <Users className="h-6 w-6 flex-shrink-0" /> 
              <span>Personas Registradas ({filteredPeople.length})</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setIsDataCollapsed(!isDataCollapsed)} className="border-blue-300">
              {isDataCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </CardHeader>
          {!isDataCollapsed && (
            <CardContent>
              {/* Buscador */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre o cédula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              {/* Lista de Personas */}
              <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-2">
                {filteredPeople.length > 0 ? (
                  filteredPeople.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200 shadow-sm hover:bg-blue-100 transition-colors min-w-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-blue-900 truncate min-w-0">
                          <span className="block truncate">{person.name}</span>
                          <span className="text-sm text-gray-500">({person.cedula})</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Toca los botones para modificar o eliminar
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="ml-2 flex-shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => {
                              setEditingPerson(person)
                            }}
                          >
                            <Edit2 className="mr-2 h-4 w-4" />
                            Modificar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-500"
                            onSelect={() => {
                              // Set person for deletion confirmation
                              setPersonToDelete(person)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">No hay personas para mostrar.</div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Modal de confirmación de borrado */}
        <Dialog
          open={!!personToDelete}
          onOpenChange={(isOpen) => {
            if (!isOpen) setPersonToDelete(null)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
            </DialogHeader>
            {personToDelete && <p>¿Está seguro de que desea eliminar a {personToDelete.name}?</p>}
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPersonToDelete(null)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (personToDelete) {
                    deletePerson(personToDelete.id)
                  }
                  setPersonToDelete(null)
                }}
              >
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Edición de Persona */}
        <Dialog
          open={!!editingPerson}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingPerson(null)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modificar Persona</DialogTitle>
            </DialogHeader>
            {editingPerson && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={editingPerson.name}
                    onChange={(e) => setEditingPerson({ ...editingPerson, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cedula" className="text-right">
                    Cédula
                  </Label>
                  <Input
                    id="cedula"
                    value={editingPerson.cedula}
                    onChange={(e) => setEditingPerson({ ...editingPerson, cedula: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingPerson(null)}>
                Cancelar
              </Button>
              <Button onClick={updatePerson}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Formulario de Ingreso de Estadísticas */}
        <Card className="shadow-lg border-blue-200 bg-white bg-decorative">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-2">
              <BarChart3 className="h-6 w-6" /> Registrar Evento Estadístico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3">
                <Label htmlFor="location" className="text-base font-semibold">
                  Ubicación
                </Label>
                <Input
                  id="location"
                  value={newStatRecord.location}
                  onChange={(e) => setNewStatRecord({ ...newStatRecord, location: e.target.value })}
                  placeholder="Lugar del evento"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label className="text-base font-semibold">Personas Abordadas</Label>
                <Input
                  type="number"
                  min="0"
                  value={newStatRecord.personasAbordadas}
                  onChange={(e) => setNewStatRecord({ ...newStatRecord, personasAbordadas: parseInt(e.target.value) || 0 })}
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label className="text-base font-semibold">Personas Consultadas</Label>
                <Input
                  type="number"
                  min="0"
                  value={newStatRecord.personasConsultadas}
                  onChange={(e) => setNewStatRecord({ ...newStatRecord, personasConsultadas: parseInt(e.target.value) || 0 })}
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label className="text-base font-semibold">Vehículos Abordados</Label>
                <Input
                  type="number"
                  min="0"
                  value={newStatRecord.vehiculosAbordados}
                  onChange={(e) => setNewStatRecord({ ...newStatRecord, vehiculosAbordados: parseInt(e.target.value) || 0 })}
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label className="text-base font-semibold">Vehículos Investigados</Label>
                <Input
                  type="number"
                  min="0"
                  value={newStatRecord.vehiculosInvestigados}
                  onChange={(e) =>
                    setNewStatRecord({ ...newStatRecord, vehiculosInvestigados: parseInt(e.target.value) || 0 })
                  }
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label className="text-base font-semibold">Motos Abordadas</Label>
                <Input
                  type="number"
                  min="0"
                  value={newStatRecord.motosAbordadas}
                  onChange={(e) => setNewStatRecord({ ...newStatRecord, motosAbordadas: parseInt(e.target.value) || 0 })}
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label className="text-base font-semibold">Motos Investigadas</Label>
                <Input
                  type="number"
                  min="0"
                  value={newStatRecord.motosInvestigadas}
                  onChange={(e) => setNewStatRecord({ ...newStatRecord, motosInvestigadas: parseInt(e.target.value) || 0 })}
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div className="md:col-span-3 flex justify-end">
                <Button type="button" onClick={registerStatistic} className="w-full md:w-auto text-lg py-2 px-8" variant="fancy">
                  Registrar Evento
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Formulario de Registro de Detenido */}
        <Card className="shadow-lg border-red-200 bg-white bg-decorative mb-10">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-red-700 flex items-center gap-2">
              <UserX className="h-6 w-6 text-red-500" /> Registrar Detenido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="detenido-nombre" className="text-base font-semibold">
                  Nombre
                </Label>
                <Input
                  id="detenido-nombre"
                  value={newDetenido.nombre}
                  onChange={(e) => setNewDetenido({ ...newDetenido, nombre: e.target.value })}
                  placeholder="Nombre completo"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label htmlFor="detenido-cedula" className="text-base font-semibold">
                  Cédula
                </Label>
                <Input
                  id="detenido-cedula"
                  value={newDetenido.cedula}
                  onChange={(e) => setNewDetenido({ ...newDetenido, cedula: e.target.value })}
                  placeholder="Número de cédula"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label htmlFor="detenido-delito" className="text-base font-semibold">
                  Delito
                </Label>
                <Input
                  id="detenido-delito"
                  value={newDetenido.delito}
                  onChange={(e) => setNewDetenido({ ...newDetenido, delito: e.target.value })}
                  placeholder="Tipo de delito"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label htmlFor="detenido-fiscal" className="text-base font-semibold">
                  Fiscal
                </Label>
                <Input
                  id="detenido-fiscal"
                  value={newDetenido.fiscal}
                  onChange={(e) => setNewDetenido({ ...newDetenido, fiscal: e.target.value })}
                  placeholder="Nombre del fiscal"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label htmlFor="detenido-expediente" className="text-base font-semibold">
                  Expediente
                </Label>
                <Input
                  id="detenido-expediente"
                  value={newDetenido.expediente}
                  onChange={(e) => setNewDetenido({ ...newDetenido, expediente: e.target.value })}
                  placeholder="Número de expediente"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div>
                <Label htmlFor="detenido-ubicacion" className="text-base font-semibold">
                  Ubicación
                </Label>
                <Input
                  id="detenido-ubicacion"
                  value={newDetenido.ubicacion}
                  onChange={(e) => setNewDetenido({ ...newDetenido, ubicacion: e.target.value })}
                  placeholder="Lugar de detención"
                  className="mt-1 text-lg py-2"
                />
              </div>
              <div className="md:col-span-3 flex justify-end">
                <Button type="button" onClick={addDetenido} className="w-full md:w-auto text-lg py-2 px-8" variant="fancy">
                  Registrar Detenido
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Formulario de Registro de Decomiso */}
        <Card className="shadow-lg border-orange-200 bg-white bg-decorative mb-10">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-orange-700 flex items-center gap-2">
              <Package className="h-6 w-6 text-orange-500" /> Registro Especial de Decomisos de Droga
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              {/* Ubicación y Observaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="decomiso-ubicacion" className="text-base font-semibold">
                    Ubicación del Decomiso
                  </Label>
                  <Input
                    id="decomiso-ubicacion"
                    value={newDecomiso.ubicacion}
                    onChange={(e) => setNewDecomiso({ ...newDecomiso, ubicacion: e.target.value })}
                    placeholder="Lugar específico del decomiso"
                    className="mt-1 text-lg py-2"
                  />
                </div>
                <div>
                  <Label htmlFor="decomiso-observaciones" className="text-base font-semibold">
                    Observaciones
                  </Label>
                  <Input
                    id="decomiso-observaciones"
                    value={newDecomiso.observaciones}
                    onChange={(e) => setNewDecomiso({ ...newDecomiso, observaciones: e.target.value })}
                    placeholder="Observaciones adicionales"
                    className="mt-1 text-lg py-2"
                  />
                </div>
              </div>

              {/* Marihuana - Panel Especial */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-green-800 flex items-center gap-2">🌿 Marihuana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="marihuana-gramos" className="text-sm font-semibold">
                        Gramos
                      </Label>
                      <Input
                        id="marihuana-gramos"
                        type="number"
                        min="0"
                        step="0.1"
                        value={newDecomiso.marihuana}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, marihuana: parseFloat(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="marihuana-kilos" className="text-sm font-semibold">
                        Kilos
                      </Label>
                      <Input
                        id="marihuana-kilos"
                        type="number"
                        min="0"
                        step="0.1"
                        value={newDecomiso.marihuanaKilos}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, marihuanaKilos: parseFloat(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="marihuana-dosis" className="text-sm font-semibold">
                        Dosis
                      </Label>
                      <Input
                        id="marihuana-dosis"
                        type="number"
                        min="0"
                        value={newDecomiso.marihuanaDosis}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, marihuanaDosis: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="marihuana-cigarrillos" className="text-sm font-semibold">
                        Cigarrillos
                      </Label>
                      <Input
                        id="marihuana-cigarrillos"
                        type="number"
                        min="0"
                        value={newDecomiso.marihuanaCigarrillos}
                        onChange={(e) =>
                          setNewDecomiso({ ...newDecomiso, marihuanaCigarrillos: parseInt(e.target.value) || 0 })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="marihuana-puchos" className="text-sm font-semibold">
                        Puchos
                      </Label>
                      <Input
                        id="marihuana-puchos"
                        type="number"
                        min="0"
                        value={newDecomiso.marihuanaPuchos}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, marihuanaPuchos: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="marihuana-otros" className="text-sm font-semibold">
                        Otros
                      </Label>
                      <Input
                        id="marihuana-otros"
                        value={newDecomiso.marihuanaOtros}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, marihuanaOtros: e.target.value })}
                        placeholder="Especificar"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cocaína - Panel Especial */}
              <Card className="border-gray-200 bg-gray-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">❄️ Cocaína</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cocaina-gramos" className="text-sm font-semibold">
                        Gramos
                      </Label>
                      <Input
                        id="cocaina-gramos"
                        type="number"
                        min="0"
                        step="0.1"
                        value={newDecomiso.cocaina}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, cocaina: parseFloat(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cocaina-kilos" className="text-sm font-semibold">
                        Kilos
                      </Label>
                      <Input
                        id="cocaina-kilos"
                        type="number"
                        min="0"
                        step="0.1"
                        value={newDecomiso.cocainaKilos}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, cocainaKilos: parseFloat(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cocaina-dosis" className="text-sm font-semibold">
                        Dosis
                      </Label>
                      <Input
                        id="cocaina-dosis"
                        type="number"
                        min="0"
                        value={newDecomiso.cocainaDosis}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, cocainaDosis: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cocaina-puntas" className="text-sm font-semibold">
                        Puntas
                      </Label>
                      <Input
                        id="cocaina-puntas"
                        type="number"
                        min="0"
                        value={newDecomiso.cocainaPuntas}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, cocainaPuntas: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cocaina-otros" className="text-sm font-semibold">
                        Otros
                      </Label>
                      <Input
                        id="cocaina-otros"
                        value={newDecomiso.cocainaOtros}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, cocainaOtros: e.target.value })}
                        placeholder="Especificar"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Crack - Panel Especial */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-yellow-800 flex items-center gap-2">💎 Crack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="crack-gramos" className="text-sm font-semibold">
                        Gramos
                      </Label>
                      <Input
                        id="crack-gramos"
                        type="number"
                        min="0"
                        step="0.1"
                        value={newDecomiso.crack}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, crack: parseFloat(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crack-dosis" className="text-sm font-semibold">
                        Dosis
                      </Label>
                      <Input
                        id="crack-dosis"
                        type="number"
                        min="0"
                        value={newDecomiso.crackDosis}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, crackDosis: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crack-piedras" className="text-sm font-semibold">
                        Piedras
                      </Label>
                      <Input
                        id="crack-piedras"
                        type="number"
                        min="0"
                        value={newDecomiso.crackPiedras}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, crackPiedras: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crack-otros" className="text-sm font-semibold">
                        Otros
                      </Label>
                      <Input
                        id="crack-otros"
                        value={newDecomiso.crackOtros}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, crackOtros: e.target.value })}
                        placeholder="Especificar"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Drogas Sintéticas - Panel Especial */}
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-purple-800 flex items-center gap-2">🧪 Drogas Sintéticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="sinteticas-gramos" className="text-sm font-semibold">
                        Gramos
                      </Label>
                      <Input
                        id="sinteticas-gramos"
                        type="number"
                        min="0"
                        step="0.1"
                        value={newDecomiso.drogasSinteticas}
                        onChange={(e) =>
                          setNewDecomiso({ ...newDecomiso, drogasSinteticas: parseFloat(e.target.value) || 0 })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sinteticas-pastillas" className="text-sm font-semibold">
                        Pastillas
                      </Label>
                      <Input
                        id="sinteticas-pastillas"
                        type="number"
                        min="0"
                        value={newDecomiso.pastillas}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, pastillas: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sinteticas-lsd" className="text-sm font-semibold">
                        LSD
                      </Label>
                      <Input
                        id="sinteticas-lsd"
                        type="number"
                        min="0"
                        value={newDecomiso.lsd}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, lsd: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sinteticas-metanfetaminas" className="text-sm font-semibold">
                        Metanfetaminas
                      </Label>
                      <Input
                        id="sinteticas-metanfetaminas"
                        type="number"
                        min="0"
                        step="0.1"
                        value={newDecomiso.metanfetaminas}
                        onChange={(e) =>
                          setNewDecomiso({ ...newDecomiso, metanfetaminas: parseFloat(e.target.value) || 0 })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sinteticas-ketaminas" className="text-sm font-semibold">
                        Ketaminas
                      </Label>
                      <Input
                        id="sinteticas-ketaminas"
                        type="number"
                        min="0"
                        step="0.1"
                        value={newDecomiso.ketamina}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, ketamina: parseFloat(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sinteticas-otros" className="text-sm font-semibold">
                        Otros
                      </Label>
                      <Input
                        id="sinteticas-otros"
                        value={newDecomiso.sinteticasOtros}
                        onChange={(e) => setNewDecomiso({ ...newDecomiso, sinteticasOtros: e.target.value })}
                        placeholder="Especificar"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="button" onClick={addDecomiso} className="text-lg py-2 px-8 bg-orange-600 hover:bg-orange-700">
                  Registrar Decomiso Completo
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Detenidos Registrados */}
        {detenidos.length > 0 && (
          <Card className="shadow-lg border-red-200 bg-white bg-decorative">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" /> Detenidos Registrados ({detenidos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {detenidos.map((detenido) => (
                  <div
                    key={detenido.id}
                    className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500 flex justify-between items-start shadow-sm"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-red-800 text-lg">{detenido.nombre}</div>
                      <div className="text-sm text-gray-600">Cédula: {detenido.cedula}</div>
                      <div className="text-sm text-gray-600">Delito: {detenido.delito}</div>
                      <div className="text-sm text-gray-600">Fiscal: {detenido.fiscal}</div>
                      <div className="text-sm text-gray-600">Expediente: {detenido.expediente}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {detenido.fecha} - {detenido.hora}
                      </div>
                      <div className="text-xs text-gray-500">📍 {detenido.ubicacion}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteDetenido(detenido.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Decomisos Registrados */}
        {decomisos.length > 0 && (
          <Card className="shadow-lg border-orange-200 bg-white bg-decorative">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-orange-700 flex items-center gap-2">
                <Scale className="h-6 w-6 text-orange-500" /> Decomisos Registrados ({decomisos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {decomisos.map((decomiso) => (
                  <div
                    key={decomiso.id}
                    className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 flex justify-between items-start shadow-sm"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-orange-800 text-lg">📍 {decomiso.ubicacion}</div>
                      <div className="text-xs text-gray-500 mb-2">
                        {decomiso.fecha} - {decomiso.hora}
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {decomiso.marihuana > 0 && <span>Marihuana: {decomiso.marihuana}g</span>}
                        {decomiso.marihuanaKilos > 0 && <span>Marihuana (kg): {decomiso.marihuanaKilos}</span>}
                        {decomiso.cocaina > 0 && <span>Cocaína: {decomiso.cocaina}g</span>}
                        {decomiso.cocainaKilos > 0 && <span>Cocaína (kg): {decomiso.cocainaKilos}</span>}
                        {decomiso.crack > 0 && <span>Crack: {decomiso.crack}g</span>}
                        {decomiso.crackDosis > 0 && <span>Crack (dosis): {decomiso.crackDosis}</span>}
                        {decomiso.drogasSinteticas > 0 && <span>Sintéticas: {decomiso.drogasSinteticas}g</span>}
                      </div>
                      {decomiso.observaciones && <p className="text-sm text-gray-600 mt-2">{decomiso.observaciones}</p>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteDecomiso(decomiso.id)}
                      className="text-orange-500 hover:text-orange-700 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 