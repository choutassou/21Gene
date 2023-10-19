function calc_rsu(data)
{
    //group HER2
    data["g-HER2"] = data["GRB7"] * 0.9 + data["HER2"] * 0.1
    if (data["g-HER2"] < 8.0) {
        data["g-HER2"] = 8.0
    }
    
    //group ESTROGEN
    data["g-ESTROGEN"] = (data["ER"] * 0.8 + data["PGR"] * 1.2 + data["Bcl2"] + data["SCUBE2"]) / 4.0

    data["g-PROLIFERATION"] = (
        data["Survivin"] + data["Ki-67"] + data["MYBL2"] + data["Cyclin-B1"] + data["STK15"]) / 5.0
    if (data["g-PROLIFERATION"] < 6.5) {
        data["g-PROLIFERATION"] = 6.5
    }
    data["g-INVASION"] = (data["Cathepsin-L2"] + data["Stromelysin-3"]) / 2.0
    
    data["RSU"] = Math.round((0.47 * data["g-HER2"]
        - 0.34 * data["g-ESTROGEN"]
        + 1.04 * data["g-PROLIFERATION"]
        + 0.10 * data["g-INVASION"]
        + 0.05 * data["CD68"]
        - 0.08 * data["GSTM1"]
        - 0.07 * data["BAG1"])*100)/100
    
    return data
}

