const {pemasok}= require('../models')

module.exports = {
    index : async (req,res,next)=>{
        try {
            const Pemasok = await pemasok.findAll();
            return res.status(200).json({
                status: true,
                message:'success',
                data:Pemasok
            });
        } catch (error) {
            next(error)
        }
    },
    store : async (req,res,next)=>{
        try {
            const{name,addres} = req.body;
             const Pemasok = await pemasok.create({
                name:name,
                addres:addres   
             });
            return res.status(201).json({
                status: true,
                message:'success',
                data: Pemasok
            });
        } catch (error) {
            next(error)
        }
    },
    show: async (req,res,next)=>{
        try {
            const {id_pemasok} = req.params;

            const Pemasok = await pemasok.findOne({
                where:{id:id_pemasok}
            });

            if (!Pemasok){
                return res.status(401).json({
                    status: false,
                    message: `can't find pemasok with id ${id_pemasok}`,
                    data: null
                })
            }
            return res.status(200).json({
                status: true,
                message:'success',
                data: Pemasok
            });
        } catch (error) {
            next(error)
        }
    },
    update: async(req,res,next)=>{
        try {
            const {id_pemasok} = req.params;
            // const Channel = await pemasok.findOne({where:{id:id_pemasok}});

            const update =await pemasok.update(req.body,{where:{id:id_pemasok}});
            
            if (update[0] == 0){
                return res.status(404).json({
                    status: false,
                    message: `can't find pemasok with id ${id_pemasok}`,
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
            const {id_pemasok}=req.params;

            const deleted = await pemasok.destroy({where:{id:id_pemasok}})
            if(!deleted){
                return res.status(404).json({
                    status: false,
                    message:`can't find pemasok with id ${id_pemasok}`
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