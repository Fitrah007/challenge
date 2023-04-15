const {produk_komponen}= require('../models')
const {produk}= require('../models')
const {komponen}= require('../models')

module.exports = {
    index : async (req,res,next)=>{
        try {
            const Produk_komponen = await produk_komponen.findAll();
            return res.status(200).json({
                status: true,
                message:'success',
                data:Produk_komponen
            });
        } catch (error) {
            next(error)
        }
    },
    store : async (req,res,next)=>{
        try {
            const{id_produk,id_komponen} = req.body;

            const cek_komponen = await komponen.findOne({where:{id:id_komponen}});
            const cek_produk = await produk.findOne({where:{id:id_produk}});
            if(!cek_produk && !cek_komponen){
                return res.status(404).json({
                    status: false,
                    message: `can't find produk with id ${id_produk} and komponen with id ${id_komponen}`,
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
            if(!cek_produk){
                return res.status(404).json({
                    status: false,
                    message: `can't find produk with id ${id_produk}`,
                    data: null
                })
            }


             const Produk_komponen = await produk_komponen.create({
                id_produk:id_produk,
                id_komponen:id_komponen   
             });
            return res.status(201).json({
                status: true,
                message:'success',
                data: Produk_komponen
            });
        } catch (error) {
            next(error)
        }
    },
    show: async (req,res,next)=>{
        try {
            const {id_produk_komponen} = req.params;

            const Produk_komponen = await produk_komponen.findOne({
                where:{id:id_produk_komponen}
            });

            if (!produk_komponen){
                return res.status(401).json({
                    status: false,
                    message: `can't find produk_komponen with id ${id_produk_komponen}`,
                    data: null
                })
            }
            return res.status(200).json({
                status: true,
                message:'success',
                data: Produk_komponen
            });
        } catch (error) {
            next(error)
        }
    },
    update: async(req,res,next)=>{
        try {
            const {id_produk_komponen} = req.params;
            // const Produk_komponen = await produk_komponen.findOne({where:{id:id_produk_komponen}});

            const update =await produk_komponen.update(req.body,{where:{id:id_produk_komponen}});
            
            if (update[0] == 0){
                return res.status(404).json({
                    status: false,
                    message: `can't find produk_komponen with id ${id_produk_komponen}`,
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
            const {id_produk_komponen}=req.params;

            const deleted = await produk_komponen.destroy({where:{id:id_produk_komponen}})
            if(!deleted){
                return res.status(404).json({
                    status: false,
                    message:`can't find produk_komponen with id ${id_produk_komponen}`
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