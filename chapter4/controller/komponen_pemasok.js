const {komponen_pemasok}= require('../models');
const {komponen} = require('../models');
const {pemasok} = require('../models');

module.exports = {
    index : async (req,res,next)=>{
        try {
            const Komponen_pemasok = await komponen_pemasok.findAll();
            return res.status(200).json({
                status: true,
                message:'success',
                data:Komponen_pemasok
            });
        } catch (error) {
            next(error)
        }
    },
    store : async (req,res,next)=>{
        try {
            const{id_komponen,id_pemasok} = req.body;
            const cek_komponen = await komponen.findOne({where:{id:id_komponen}});
            const cek_pemasok = await pemasok.findOne({where:{id:id_pemasok}});
            if(!cek_pemasok && !cek_komponen){
                return res.status(404).json({
                    status: false,
                    message: `can't find komponen with id ${id_komponen} and pemasok with id ${id_pemasok}`,
                    data: null
                })
            }
            if(!cek_komponen){
                return res.status(404).json({
                    status: false,
                    message: `can't find komponen with id ${id_komponen}`,
                    data: null
                })
            }
            if(!cek_pemasok){
                return res.status(404).json({
                    status: false,
                    message: `can't find pemasok with id ${id_pemasok}`,
                    data: null
                })
            }

             const Komponen_pemasok = await komponen_pemasok.create({
                id_komponen:id_komponen,
                id_pemasok:id_pemasok   
             });
            return res.status(201).json({
                status: true,
                message:'success',
                data: Komponen_pemasok
            });
        } catch (error) {
            next(error)
        }
    },
    show: async (req,res,next)=>{
        try {
            const {id_komponen_pemasok} = req.params;

            const Komponen_pemasok = await komponen_pemasok.findOne({
                where:{id:id_komponen_pemasok}
            });

            if (!komponen_pemasok){
                return res.status(401).json({
                    status: false,
                    message: `can't find komponen_pemasok with id ${id_komponen_pemasok}`,
                    data: null
                })
            }
            return res.status(200).json({
                status: true,
                message:'success',
                data: Komponen_pemasok
            });
        } catch (error) {
            next(error)
        }
    },
    update: async(req,res,next)=>{
        try {
            const {id_komponen_pemasok} = req.params;
            // const Komponen_pemasok = await komponen_pemasok.findOne({where:{id:id_komponen_pemasok}});

            const update =await komponen_pemasok.update(req.body,{where:{id:id_komponen_pemasok}});
            
            if (update[0] == 0){
                return res.status(404).json({
                    status: false,
                    message: `can't find komponen_pemasok with id ${id_komponen_pemasok}`,
                    data: null
                })
            }
            return res.status(201).json({
                status: true,
                message:"success",
                data: update
            })

        } catch (error) {
            next(error)
        }
    },
    destroy: async(req,res,next)=>{
        try {
            const {id_komponen_pemasok}=req.params;

            const deleted = await komponen_pemasok.destroy({where:{id:id_komponen_pemasok}})
            if(!deleted){
                return res.status(404).json({
                    status: false,
                    message:`can't find komponen_pemasok with id ${id_komponen_pemasok}`
                })
            }
            
            return res.status(200).json({
                status: true,
                message:'success',
                data: deleted
            });
        } catch (error) {
            next(error)
        }
    }
}